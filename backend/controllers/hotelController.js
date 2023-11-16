const db = require("../models");
const Hotel = db.hotel;
const Owner = db.owner;
const Order = db.order;
const OD = db.order_detail;
const ImgHotel = db.img_hotel;
const room = db.room_hotel;
const Rating = db.rating_hotel;
const Report = db.report_hotel;
const Favorate = db.favorate_hotel;
const coupon = db.coupon_owner;

const sequelize = require('sequelize');
const Op  = sequelize.Op
const dayjs = require('dayjs');

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
        const exsitName_hotel = await Hotel.findOne({ where: {name_hotel}}); 
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

const updateImgHotel = async (req, res) => {
    try {
        upload.single("avatar")(req, res, async function (err) {
            const id = req.params.id;
            const { id_hotel } = req.body;
            const existImg = await ImgHotel.findByPk(id);
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }

            if(!existImg){
                return res.status(200).json({ message: `Không tìm thấy hình ảnh`});
            }else{
                // Kiểm tra nếu có file ảnh mới được chọn
                if (req.file) {
                    const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
                    const imagePath = `./uploads/${existImg.name_banner}`;
                    deleteFile(imagePath); //gọi hàm xóa file ảnh trên uploads
                    await existImg.update({ url_banner: imageUrl, name_banner: req.file.filename, id_hotel: id_hotel })
                }else{
                    await existImg.update({ id_hotel: id_hotel })
                }
                return res.status(200).json({ message: `Cập nhật thành công`});
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const existHotel  = await Hotel.findByPk(id);
        if(!existHotel){
            return res.status(200).json({message: 'Không tìm thấy khách sạn.'});
        }else{
            // xử lý hóa đơn
            const exitsOrder = await Order.findOne({
              where: { 
                id_hotel: id,
                [Op.or]: [{ status: 'Đã Thanh Toán' }, { status: 'Đã Đặt' }]
              }
            });
            if (exitsOrder) {
              /*
               note command
               Khi tồn tại hóa đơn chưa trả phòng
               Thực hiện => lấy ngày cuối cùng họ trả phòng để report lại owner
               Thực hiện bằng cách cú pháp find kết hợp ...
              */
              const last_checkout = await OD.findOne({
                attributes: ['id_order', [sequelize.fn('MAX', sequelize.col('check_out')), 'latest_checkout']],
                where: {
                  '$order.status$': 'Đã Thanh Toán'
                },
                include: [
                  {
                    model: Order,
                    as: 'order',
                    attributes: [],
                    where: {
                      status: 'Đã Thanh Toán',
                    },
                  },
                ],
                group: ['id_order'],
                order: [[sequelize.fn('MAX', sequelize.col('check_out')), 'DESC']],
              })
              const time = new Date(last_checkout.getDataValue('latest_checkout'))
              var result_last = dayjs(time).format('DD/MM/YYYY h:MM:ss')
              return res.status(201).json({ message: `Không thể xóa hotel - Xóa sau thời gian: ${result_last}` });
            }
            else {
                await Order.destroy({ where: { id_hotel: existHotel.id } });
                await room.destroy({ where: { id_hotel: existHotel.id } });
                await Rating.destroy({ where: { id_hotel: existHotel.id } });
                await Report.destroy({ where: { id_hotel: existHotel.id } });
                await Favorate.destroy({ where: { id_hotel: existHotel.id } });
                await ImgHotel.destroy({ where: { id_hotel: existHotel.id } });
                await coupon.destroy({ where: { id_hotel: existHotel.id } });
                await existHotel.destroy();
                return res.status(200).json({ message: 'Xóa thành công.' });
            }
        }
    } catch (error) {
        console.log(error);
    }
}



const deleteImgHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const existImg = await ImgHotel.findByPk(id);

        if (existImg.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy' });
        }
        const imagePath = `./uploads/${existImg.name_img}`;
        deleteFile(imagePath);
        await existImg.destroy();
        return res.status(200).json({ message: 'Xóa thành công' });
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
    updateImgHotel,
    deleteHotel,
    deleteImgHotel
}