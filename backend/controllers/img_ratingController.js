const db = require("../models");
const ImgRating = db.img_rating;

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

const getImgRating = async (req, res) => {
    try {
        const img = await ImgRating.findAll();
        res.status(200).json(img);
    } catch (error) {
        console.log(error);
    }
}

const addImgRating = async (req, res) => {
    try {
        upload.single("avatar")(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }
            // Kiểm tra nếu có file ảnh mới được chọn
            if (req.file) {
                const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
                await ImgRating.create({url: imageUrl, name_img: req.file.filename})
                res.status(200).json({ message: "Thêm thành công" })
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const updateImgRating = async (req, res) => {
    try {
        upload.single("avatar")(req, res, async function (err) {
            const id = req.params.id;
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }

            const exsitImgReport = await ImgRating.findByPk(id);
            // Kiểm tra nếu có file ảnh mới được chọn
            if (req.file) {
                const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
                const imagePath = `./uploads/${exsitImgReport.name_img}`;
                deleteFile(imagePath);
                await exsitImgReport.update({url: imageUrl, name_img: req.file.filename});
                return res.status(200).json({ message: `Cập nhật thành công ` });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteImgRating = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitImgReport = await ImgRating.findByPk(id);

        if (exsitImgReport.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy' });
        }
        const imagePath = `./uploads/${exsitImgReport.name_img}`;
        deleteFile(imagePath);
        await exsitImgReport.destroy();
        return res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getImgRating,
    addImgRating,
    updateImgRating,
    deleteImgRating
}