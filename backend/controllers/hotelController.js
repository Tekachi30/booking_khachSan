const db = require("../models");
const Hotel = db.hotel;
const Owner = db.owner;
const ImgHotel = db.img_hotel;
const ImgRoom = db.img_room;
const Room = db.room_hotel;
const Rating = db.rating_hotel;
const Report = db.report_hotel;
const Favorate = db.favorate_hotel;
const coupon = db.coupon_owner;
const Order = db.order;
const OD = db.order_detail;
const sequelize = require('sequelize');
const Op = sequelize.Op
const dayjs = require('dayjs');
const axios = require('axios')
const fs = require("fs"); // package thao tác vs file 
const multer = require("multer"); // package sử dụng để thao tác upload file
// Được sử dụng để lưu trữ các tệp được tải lên trong thư mục uploads.
const dotenv = require('dotenv');
const KEY_MAP = process.env.KEY_MAP;
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

const resultPost = async (citycode, districtcode, ward_code, address_hotel) => {
    try {
        // Lấy thông tin về city, district, commune từ API provinces
        const cityAPI = await axios.get(`https://provinces.open-api.vn/api/p/${citycode}`);
        const apicityData = cityAPI.data.name;
        const districtAPI = await axios.get(`https://provinces.open-api.vn/api/d/${districtcode}`);
        const apidistrictData = districtAPI.data.name;
        const communeAPI = await axios.get(`https://provinces.open-api.vn/api/w/${ward_code}`);
        const apicommuneData = communeAPI.data.name;
        let address = `${address_hotel},${apicommuneData},${apidistrictData},${apicityData}`;
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${KEY_MAP}`, {
        });
        const data = response.data.features[0].geometry
        return data;
    } catch (error) {
        console.log(error);
    }
};
// start 

const getHotelId = async (req, res) => {
    try {
        const id = req.params.id;
        const hotel = await Hotel.findOne({
            where: { id: id },
            include: [
                {
                    model: ImgHotel, attributes: ['id', 'name_img', 'url', 'id_hotel'], raw: true,
                    nest: true,
                    required: true
                },
                {
                    model: Room,
                    include: [
                        { model: ImgRoom }
                    ],
                    raw: true,
                    nest: true,
                    required: true
                },
                {
                    model: Rating
                }

            ]
        });
        res.status(200).json(hotel);
    } catch (error) {
        console.log(error);
    }
}

const getHotel = async (req, res) => {
    try {
        const hotels = await Hotel.findAll({
            include: [
                {
                    model: ImgHotel, attributes: ['id', 'name_img', 'url', 'id_hotel'], raw: true,
                    nest: true,
                    required: true
                },
                {
                    model: Room,
                    raw: true,
                    nest: true,
                    required: true
                },
                {
                    model: Rating
                }

            ]
        });

        res.status(200).json(hotels);
    } catch (error) {
        console.log(error);
    }
}

const getHotelByOwner = async (req, res) => {
    const idOwner = req.params.id;
    try {
        const hotel = await Hotel.findAll({
            where: { id_owner: idOwner },
            include: [
                {
                    model: ImgHotel, attributes: ['id', 'name_img', 'url', 'id_hotel'],
                    raw: true,
                    nest: true,
                    required: true
                },
                {
                    model: Room,
                    raw: true,
                    nest: true,
                    required: true
                },
                {
                    model: Owner, attributes: ['id', 'fullname'],
                },
            ]
        });

        res.status(200).json(hotel);
    } catch (error) {
        console.log(error);
    }
}

const getHotelNon = async (req, res) => {
    const idOwner = req.params.id;
    try {
        const hotel = await Hotel.findAll({
            where: { id_owner: idOwner },
            include: [
                {
                    model: ImgHotel, attributes: ['id', 'name_img', 'url', 'id_hotel'],
                    raw: true,
                    nest: true,
                },
                {
                    model: Room,
                    raw: true,
                    nest: true,
                },
                {
                    model: Owner, attributes: ['id', 'fullname'],
                    raw: true,
                    nest: true,
                },
            ]
        });
        const hotelsWithMissingData = hotel.filter(hotel => {
            const hasNoImages = !hotel.img_hotels || hotel.img_hotels.length === 0;;
            const hasNoRooms = !hotel.room_hotels || hotel.room_hotels.length === 0;
            return hasNoImages || hasNoRooms;
        });
        res.status(200).json(hotelsWithMissingData);
    } catch (error) {
        console.log(error);
    }
}


const addHotel = async (req, res) => {
    try {
        const id = req.params.id
        // check owner tồn tại hay không ?
        const exitsOwner = await Owner.findByPk(id)
        if(exitsOwner)
        {
            const { name_hotel, address, city_code, district_code, ward_code, information } = req.body;
        const locationData = await resultPost(city_code, district_code, ward_code, address);
        const exsitName_hotel = await Hotel.findOne({ where: { name_hotel: name_hotel } });
        // ! là không tồn tại hoặc đơn giản là phủ định của cái biến đó. 
        if (exsitName_hotel) {
            return res.status(201).json({ message: 'Tên Khách sạn đã được sử dụng.' });
        } else {
            const hotel = await Hotel.create({
                name_hotel: name_hotel,
                address: address,
                city_code: city_code,
                district_code: district_code,
                ward_code: ward_code,
                information: information,
                isactive: true,
                point: 0,
                level: 1,
                id_owner: id,
                longitude: locationData.coordinates[0],
                latitube: locationData.coordinates[1]
            })
            return res.status(200).json({ message: 'Thêm khách sạn thành công.', hotel });
        }
        }
        else
        {
            return res.status(201).json({ message: 'Không tồn tại chủ khách sạn' });

        }
        
    } catch (error) {
        console.log(error);
    }
}

const addImgHotel = async (req, res) => {
    try {
        const idHotel = req.params.id;
        const existHotel = await Hotel.findByPk(idHotel);
        if (!existHotel) {
            return res.status(201).json({ message: 'Khách sạn không tồn tại' });
        } else {
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
                        const img = await ImgHotel.create({ url: imageUrl, name_img: req.files[i].filename, id_hotel: idHotel });
                        imgs.push(img);
                    }
                    return res.status(200).json({ message: "Thêm thành công" })
                } else {
                    return res.status(201).json({ message: 'Chọn ít nhất một ảnh đại diện' });
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
        const { name_hotel, address, city_code, district_code, ward_code, information } = req.body;
        const locationData = await resultPost(city_code, district_code, ward_code, address);
        const exsitHotel = await Hotel.findByPk(id);
        // loại đi chính hotel ra khỏi trường hợp => fix tương đối vs các code còn lai nha
        const exsitName_hotel = await Hotel.findOne({ where: { name_hotel, id: { [Op.not]: id } } });
        if (exsitHotel) {
            if (!exsitName_hotel) {
                exsitHotel.name_hotel = name_hotel,
                    exsitHotel.address = address,
                    exsitHotel.city_code = city_code,
                    exsitHotel.district_code = district_code
                exsitHotel.ward_code = ward_code
                exsitHotel.information = information,
                    exsitHotel.longitude = locationData.coordinates[0],
                    exsitHotel.latitube = locationData.coordinates[1]

                await exsitHotel.save();
                return res.status(200).json({ message: 'Cập nhập thành công' });

            } else {
                return res.status(200).json({ message: 'Tên Khách sạn đã được sử dụng.' });
            }
        } else {
            return res.status(200).json({ message: 'Khách sạn không tồn tại.' });
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

            if (!existImg) {
                return res.status(200).json({ message: `Không tìm thấy hình ảnh` });
            } else {
                // Kiểm tra nếu có file ảnh mới được chọn
                if (req.file) {
                    const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
                    const imagePath = `./uploads/${existImg.name_banner}`;
                    deleteFile(imagePath); //gọi hàm xóa file ảnh trên uploads
                    await existImg.update({ url_banner: imageUrl, name_banner: req.file.filename, id_hotel: id_hotel })
                } else {
                    await existImg.update({ id_hotel: id_hotel })
                }
                return res.status(200).json({ message: `Cập nhật thành công` });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const existHotel = await Hotel.findByPk(id);
        if (!existHotel) {
            return res.status(201).json({ message: 'Không tìm thấy khách sạn.' });
        } else {

            const orders = await Order.findAll(
                {
                    attributes: ['id', 'status'],
                    include:
                        [
                            {
                                model: OD, attributes: ['id', 'id_room', 'id_order'],
                                required: true,
                                include: [
                                    {
                                        model: Room, attributes: ['id', 'id_hotel'],
                                        where: { id_hotel: id },
                                        required: true,
                                    }
                                ]
                            }
                        ]
                }
            )

            if(orders.length > 0)
            {
                const paidOrders = orders.filter(order => order.status == 'Đã Thanh Toán');

                if (paidOrders.length > 0) {
                    return res.status(200).json({ message: 'Không thể xóa khách sạn vì có đơn hàng đã thanh toán.' });
                }
                else {
                    for (const order of orders) {
                        await OD.destroy({ where: { id_order: order.id } });
                        await order.destroy();
                    }
                    const img_hotel = await ImgHotel.findAll({ where: { id_hotel: existHotel.id } });
                    if (img_hotel.length > 0) {
                        for (const img of img_hotel) {
                            const imagePath = `./uploads/${img.name_img}`;
                            deleteFile(imagePath);
                            await img.destroy();
                        }
                    }
                    /*
                        tìm X
                        lấy list img_X từ X tìm được (id_X)
                    */
                    const room = await Room.findAll({ where: { id_hotel: existHotel.id } })
                    const roomIds = room.map((r) => r.id);
                    const img_room = await ImgRoom.findAll({ where: { id_room: roomIds } });
                    if (img_room.length > 0) {
                        for (const img of img_room) {
                            const imagePath = `./uploads/${img.name_img}`;
                            deleteFile(imagePath);
                            await img.destroy();
                        }
                    }
                    await Room.destroy({ where: { id_hotel: existHotel.id } });
    
                    await Rating.destroy({ where: { id_hotel: existHotel.id } }); 
    
                    await Report.destroy({ where: { id_hotel: existHotel.id } });
    
                    await Favorate.destroy({ where: { id_hotel: existHotel.id } }); 
    
                    await coupon.destroy({ where: { id_hotel: existHotel.id } });
    
                    await existHotel.destroy();
    
                    return res.status(200).json({ message: 'Xóa thành công.' });
                }
            }

            else
            {
                const img_hotel = await ImgHotel.findAll({ where: { id_hotel: existHotel.id } });
                    if (img_hotel.length > 0) {
                        for (const img of img_hotel) {
                            const imagePath = `./uploads/${img.name_img}`;
                            deleteFile(imagePath);
                            await img.destroy();
                        }
                    }
                    /*
                        tìm X
                        lấy list img_X từ X tìm được (id_X)
                    */
                    const room = await Room.findAll({ where: { id_hotel: existHotel.id } })
                    const roomIds = room.map((r) => r.id);
                    const img_room = await ImgRoom.findAll({ where: { id_room: roomIds } });
                    if (img_room.length > 0) {
                        for (const img of img_room) {
                            const imagePath = `./uploads/${img.name_img}`;
                            deleteFile(imagePath);
                            await img.destroy();
                        }
                    }
                    await Room.destroy({ where: { id_hotel: existHotel.id } });
    
                    await Rating.destroy({ where: { id_hotel: existHotel.id } }); 
    
                    await Report.destroy({ where: { id_hotel: existHotel.id } });
    
                    await Favorate.destroy({ where: { id_hotel: existHotel.id } }); 
    
                    await coupon.destroy({ where: { id_hotel: existHotel.id } });
    
                    await existHotel.destroy();
    
                    return res.status(200).json({ message: 'Xóa thành công.' });
            }
            

        }
    } catch (error) {
        console.log(error);
    }
}

// cái này nó xóa trên từng ảnh 
const deleteImgHotel = async (req, res) => {
    try {
        const id = req.params.id;
        const existImg = await ImgHotel.findByPk(id);

        if (!existImg) {
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

const searchHotel = async (req, res) => {
    try {
        const { option_price, name_hotel, city_code } = req.body
        let where_price;
        

        switch (option_price) {
            case 'under1':
                where_price = { price: { [Op.lt]: 1000000 } };;
                break;
            case '1to3':
                where_price = { price: { [Op.between]: [1000000, 3000000] } };
                break;
            case '3to6':
                where_price = { price: { [Op.between]: [3000000, 6000000] } };
                break;
            case 'above6':
                where_price = { price: { [Op.gte]: 6000000 } };
                break;
            case 'full':
                where_price = {};
                break;
            default:
                console.log('Lỗi không truyền mức giá vào');
                break;
        }

        const get_hotel = await Hotel.findAll(
            {
                // where: { name_hotel: { [Op.like]: `%${name_hotel}%` }, city_code: city_code },
                where: {
                    [Op.or]: [
                        { name_hotel: { [Op.like]: `%${name_hotel}%` } },
                        { city_code: city_code }
                    ]
                },
                include: [
                    { model: Room, where: where_price },
                    {
                        model: ImgHotel, attributes: ['id', 'name_img', 'url', 'id_hotel'], raw: true,
                        nest: true,
                        required: true
                    },
                    {
                        model: Rating
                    }
                ]
            }
        )
        res.json(get_hotel)
    } catch (error) {
        console.log(error)
    }
}

const HotelFavorate = async (req, res) => {
    try {
        const { id, id_user, id_hotel, status } = req.body;
        const existFavorate = await Favorate.findOne({ where: { id_user, id_hotel } });

        if (existFavorate) {
            const favorate = await Favorate.destroy({ where: { id: id, id_user: id_user, id_hotel: id_hotel } });
            res.status(200).json({ favorate, message: "Hủy lưu thành công" })
        }
        else {
            const favorate = await Favorate.create({ id_user, id_hotel, status });
            res.status(200).json({ favorate, message: "Lưu khách sạn thành công" })
        }
    } catch (error) {
        res.status(404).json(error)
    }
};

const renderFavorate = async (req, res) => {
    try {
        const favorate = await Favorate.findAll(
            {
                attributes: ['id', 'id_hotel', 'status', 'id_user'],
                include: [
                    { model: Hotel, attributes: ['id', 'name_hotel'] }
                ],
                raw: true,
                nest: true,
            }
        );
        res.json(favorate);
    } catch (error) {
        res.json("không lấy được ");
        console.log(error);
    }
};


module.exports = {
    getHotel,
    getHotelId,
    getHotelNon,
    getHotelByOwner,
    addHotel,
    addImgHotel,
    updateHotel,
    updateImgHotel,
    deleteHotel,
    deleteImgHotel,
    searchHotel,
    HotelFavorate,
    renderFavorate

}