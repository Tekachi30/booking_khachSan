const db = require("../models");
const Hotel = db.hotel;
const Owner = db.owner;
const ImgHotel = db.img_hotel;

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

// start

const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findAll({
            include:[
                {model: ImgHotel, attributes: ['id', 'name_img', 'url', 'id_hotel']},
            ]
        });
        res.status(200).json(hotel);
    } catch (error) {
        console.log(error);
    }
}

const getHotelByOwner = async (req, res) => {
    const idOwner = req.params.id;
    try {
        const hotel = await Hotel.findAll({
            include:[
                {model: ImgHotel, attributes: ['id', 'name_img', 'url', 'id_hotel']},
                {model: Owner, attributes: ['id','fullname'], where: { id: idOwner }}, 
            ]
        });
        res.status(200).json(hotel);
    } catch (error) {
        console.log(error);
    }
}

const addHotel = async (req, res) => {
    try {
        const { name_hotel, address, city_code, district_code, ward_code, imformation} = req.body;
        const exsitName_hotel = await Hotel.findOne({ where: {name_hotel: name_hotel}});
        if(!exsitName_hotel){
            return res.status(400).json({message: 'Tên Khách sạn đã được sử dụng.'});
        }else{
            await Hotel.create({
                name_hotel: name_hotel,
                address: address,
                city_code: city_code,
                district_code: district_code,
                ward_code: ward_code,
                imformation: imformation,
                isactive:true
            })
            return res.status(200).json({message: 'Thêm khách sạn thành công.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const addImgHotel = async (req, res) => {
    try {
        const idHotel = req.params.id;
        const existHotel = await Hotel.findByPk(idHotel);
        if(!existHotel){
            return res.status(201).json({message: 'Khách sạn không tồn tại.'});
        }else{
            upload.array("avatar", 10)(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ message: err.message });
                } else if (err) {
                    return res.status(400).json({ message: err.message });
                }
                // Kiểm tra nếu có file ảnh mới được chọn
                if (req.files.length > 0) {
                    const imgs = [];
      
                    for (let i = 0; i < req.files.length; i++) {
                        const imageUrl = `${req.protocol}://${req.get('host')}/${req.files[i].filename}`;
                        const img = await ImgHotel.create({url: imageUrl, name_img: req.files[i].filename, id_hotel: idHotel});
                        imgs.push(img);
                    }
                    return res.status(200).json({ message: "Thêm thành công" })
                }else{
                    return res.status(201).json({message: 'Chọn ít nhất một ảnh đại diện' });
                }
            });
        }
        
    } catch (error) {
        console.log(error);
    }
}

const updateHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitHotel  = await Hotel.findByPk(id);
        const exsitName_hotel = await Hotel.findOne({ where: {name_hotel: name_hotel}}); 
        if(exsitHotel){
            if(!exsitName_hotel){
                exsitHotel.name_hotel = name_hotel,
                exsitHotel.address = address,
                exsitHotel.city_code = city_code,
                exsitHotel.district_code
                await exsitHotel.save();
            }else{
                return res.status(200).json({message: 'Tên Khách sạn đã được sử dụng.'});
            }
        }else{
            return res.status(200).json({message: 'Khách sạn không tồn tại.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const exsitHotel  = await Hotel.findByPk(id);
        if(exsitHotel){
            await exsitHotel.destroy();
        }else{
            return res.status(200).json({message: 'Khách sạn không tồn tại.'});
        }
    } catch (error) {
        console.log(error);
    }
}
 


module.exports = {
    getHotel,
    getHotelByOwner,
    addHotel,
    addImgHotel,
    updateHotel,
    deleteHotel
}