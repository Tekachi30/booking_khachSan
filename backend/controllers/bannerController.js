const db = require("../models");
const Banner = db.banner;
const dotenv = require('dotenv');
dotenv.config();

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
  return res;
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
    await runMiddleware(req, res, myUploadMiddleware);

    const id = req.params.id;
    const {title_banner, content_banner} = req.body;
    const imagesData = [];
    try {
        const exsitTitle = await Banner.findOne({ where: {title_banner: title_banner}});
        if(exsitTitle){
            res.status(400).json({messsage: 'Tiêu đề đã tồn tại'});
        }else{
            await runMiddleware(req, res, upload.single("avatar"));
            // chuyển đổi dữ liệu nhị phân (buffer) từ file được upload lên thành chuỗi ký tự mã hóa base64.
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            // xử lý đưa dữ liệu lên cloud
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cldRes = await handleUpload(dataURI);
            if(cldRes){
                const banner = await Banner.create({
                    title_banner: title_banner,
                    content_banner: content_banner,
                    public_id: cldRes.public_id,
                    url_img: cldRes.url_img
                })
                if (banner) {
                  imagesData.push({
                    public_id: cldRes.public_id,
                    url: cldRes.url_img
                  });
                }
                if (imagesData.length > 0) {
                    res.status(200).json({messsage: 'Thêm banner thành công.'});
                }else{
                    res.status(400).json({messsage: 'Không có hình ảnh được truyền vào.'});
                }
            }else{
                res.status(400).json({messsage: 'Thêm banner thất bại.'});
            }
            
        };
    } catch (error) {
        console.log(error);
    }
}

const updateBanner = async (req, res) => {
    const {title_banner, content_banner} = req.body;
    const {idBanner, idAdmin} = res.params.id;
    try {
    const exsitBanner = await Banner.findByPk(idBanner);
        if(exsitBanner){
            const exsitTitle = await Banner.findOne({ where: {title_banner: title_banner}});
            if(exsitTitle){
                res.status(400).json({messsage: 'Tiêu đề đã tồn tại'});
            }else{
                await cloudinary.uploader.destroy(`${exsitTitle.public_id}`)
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
                    res.status(200).json({ message: "Cập nhật banner thành công" });
                }
            }
        }else{
        res.status(400).json({messsage: 'Không tìm thấy banner.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteBanner = async (req, res) => {
    
}

module.exports = {
    getBanner,
    updateBanner,
}