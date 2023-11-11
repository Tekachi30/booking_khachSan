const db = require("../models");
const Banner = db.banner
const dotenv = require('dotenv')
dotenv.config();
// setup 1 multer + cloudinary
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddlewareSingle = upload.single("avatar");
// cho phép thêm 1 loạt ảnh
const myUploadMiddleware = upload.array("avatars");

// config cloudinary để sử dụng service
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// xử lý nhận file từ client và upload lên cloud
async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    // object nhận về từ cloud -> lấy bỏ vô table db (public_id, url)
    return res;
}
// fn: Hàm middleware cần được chạy.
// Middleware là một hàm được gọi trước khi xử lý yêu cầu HTTP và trả lời cho yêu cầu đó. 
// Tìm hiểu kỉ trong => internet
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

const getBanner = async (req, res) => {
    try {
        const banner = await Banner.findAll();
        res.json(banner);
    } catch (error) {
        console.log(error);
    }
}

const addBanner = async (req, res) => {
    try {
        // gọi lại hàm runmiddleware 
        await runMiddleware(req, res, myUploadMiddlewareSingle);

        // lấy giá trị từ client
         const { title_banner, content_banner } = req.body;

        // tạo mảng để lưu thông tin hình ảnh
        const imagesData = [];

        // chuyển đổi dữ liệu nhị phân (buffer) từ file được upload lên thành chuỗi ký tự mã hóa base64.
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        // xử lý đưa dữ liệu lên cloud
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        // kiểm tra xem quá trình đưa file lên cloud -> đưa dữ liệu lên db lại (public_id,url)
        if (cldRes) {
            // lưu thông tin hình ảnh
            const banners = await Banner.create({
                title_banner:title_banner, 
                content_banner:content_banner,
                public_id: cldRes.public_id,
                url_banner: cldRes.url
            })
            if (banners) {
                imagesData.push({
                    public_id: cldRes.public_id,
                    url: cldRes.url
                });
            }
        }


        if (imagesData.length > 0) {
            res.json({
                message: 'Thêm thành công',
                images: imagesData
            });
        } else {
            res.json({
                message: 'Không có hình ảnh nào được thêm vào cơ sở dữ liệu'
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
}

const updateBanner = async (req, res) => {
    try {
        const { title_banner, content_banner } = req.body;
        const idBanner = req.params.id;
        const exsitBanner = await Banner.findByPk(idBanner);
        if (exsitBanner) {
            const exsitTitle = await Banner.findOne({ where: { title_banner } });
            if (exsitTitle) {
                return res.status(400).json({ messsage: 'Tiêu đề đã tồn tại' });
            } else {
                await cloudinary.uploader.destroy(`${exsitBanner.public_id}`)
                await runMiddleware(req, res, upload.single("avatar"));

                const b64 = Buffer.from(req.file.buffer).toString("base64");
                // xử lý đưa dữ liệu lên cloud
                let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
                const cldRes = await handleUpload(dataURI);

                if (cldRes) {
                        exsitBanner.title_banner = title_banner,
                        exsitBanner.content_banner = content_banner,
                        exsitBanner.public_id = cldRes.public_id,
                        exsitBanner.url_img = cldRes.url_img
                    await exsitBanner.save();
                    return res.status(200).json({ message: "Cập nhật banner thành công" });
                }
            }
        } else {
            return res.status(400).json({ messsage: 'Không tìm thấy banner.' });
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitBanner = await Banner.findByPk(id);
        if (exsitBanner) {
            // xóa trên cloud là dựa vào public_id lưu lại từ lúc thêm
            await cloudinary.uploader.destroy(`${exsitBanner.public_id}`)
            await exsitBanner.destroy();
            return res.status(200).json({ messsage: 'Xóa banner thành công.' });
        } else {
            return res.status(400).json({ messsage: 'Không tìm thấy banner.' });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getBanner,
    addBanner,
    updateBanner,
    deleteBanner
}