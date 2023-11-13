const db = require("../models");
const Banner = db.banner

const fs = require("fs"); // package thao tác vs file 
const multer = require("multer"); // package sử dụng để thao tác upload file
// Được sử dụng để lưu trữ các tệp được tải lên trong thư mục uploads.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

// Hàm sử dụng để thao tác với file = multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // giới hạn dung lượng file 5MB
    },
});

// Sử dụng hàm để xóa file khỏi thư mục upload
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`File ${filePath} has been deleted`);
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
        try {
            upload.single("avatar")(req, res, async function (err) {
                const { title_banner,content_banner } = req.body
                const exsitTitle = await Banner.findOne({ where: { title_banner } });
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ message: err.message });
                } else if (err) {
                    return res.status(400).json({ message: err.message });
                }
                if(!exsitTitle){
                    if (req.file) {
                        // Kiểm tra nếu có file ảnh mới được chọn
                        const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
                        await Banner.create({title_banner: title_banner ,url_banner: imageUrl, name_banner: req.file.filename, content_banner:content_banner})
                        return res.status(200).json({ message: "Thêm thành công" })
                    }
                }else{
                    return res.status(201).json({ message: "Title bị trùng lặp." })
                }
            });
        } catch (error) {
            // xuất lỗi ra trên console
            console.log(error)
        }
    } catch (error) {
        console.log(error)

    }
}

const updateBanner = async (req, res) => {
    try {  
        upload.single("avatar")(req, res, async function (err) {
            const { title_banner,content_banner } = req.body
            const id = req.params.id;
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }

            const Ubanner = await Banner.findByPk(id);
            const exsitTitle = await Banner.findOne({ where: { title_banner } });

            if(!exsitTitle){
                // Kiểm tra nếu có file ảnh mới được chọn
                if (req.file) {
                    const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
                    const imagePath = `./uploads/${Ubanner.name_banner}`;
                    deleteFile(imagePath);
                    await Ubanner.update({ title_banner: title_banner, content_banner:content_banner, url_banner: imageUrl, name_banner: req.file.filename })
                } else {
                    await Ubanner.update({ title_banner: title_banner,content_banner:content_banner});
                }
                return res.status(200).json({ message: `Cập nhật thành công ` });
            }else{
                return res.status(201).json({ message: "Title bị trùng lặp." })
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const deleteBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const banner = await Banner.findByPk(id)

        if (banner.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy' });
        }
        const imagePath = `./uploads/${banner.name_banner}`;
        deleteFile(imagePath);
        await banner.destroy();
        return res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Xóa thất bại' });
    }
}
module.exports = {
    getBanner,
    addBanner,
    updateBanner,
    deleteBanner
}