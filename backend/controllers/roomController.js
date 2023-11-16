const db = require('../models');
const Room = db.room_hotel;
const ImgRoom = db.img_room;
const Hotel = db.hotel;
const Owner = db.owner;

const getRoom = async (req, res) => {
    try {
        const id = req.params.id
        const room = await Room.findAll({
            where:{id_hotel:id},
            include:[
                {model: ImgRoom, attributes: ['id', 'name_img', 'url', 'id_room']},
            ]
        });
        res.json(room);
    } catch (error) {
        console.log(error);
    }
}


const addRoom = async (req, res) => {
    try {
        const { id_hotel,type_room,book_status,price } = req.body;
        await Room.create({
            id_hotel: id_hotel,
            type_room: type_room,
            book_status: book_status,
            price: price,
        })
        return res.status(200).json({message: 'Thêm phòng thành công.'});
    } catch (error) {
        console.log(error);
    }
}

const addImgRoom = async (req, res) => {
    try {
        const id = req.params.id;
        const existRoom = await Room.findByPk(id);
        if(!existRoom){
            return res.status(201).json({message: 'Không tìm thấy phòng.'});
        }else{
            // Thêm nhiều ảnh
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
                        const img = await ImgHotel.create({url: imageUrl, name_img: req.files[i].filename, id_room: id});
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

const updateRoom = async (req, res) => {
    try {
        const id = req.pramas.id;
        const existRoom = await Room.findByPk(id);
        const { type_room,book_status,price } = req.body;
        if(!existRoom){
            return res.status(201).json({message: 'Không tìm thấy phòng.'});
        }else{
            await Room.update({
                type_room: type_room,
                book_status: book_status,
                price: price,
            })
            return res.status(200).json({message: 'thành công.'});
        }
    } catch (error) {
        console.log(error);
    }
}
// update status room
const updateStatusRoom = async (req, res) => {
    try {
        const id = req.pramas.id;
        const existRoom = await Room.findByPk(id);
        if(!existRoom){
            return res.status(201).json({message: 'Không tìm thấy phòng.'});
        }else{
            await Room.update({
                book_status: true,
            })
            return res.status(200).json({message: 'Thành công.'});
        }
    } catch (error) {
        console.log(error);
    }
}

const updateImgRoom = async (req, res) => {
    try {
        // sửa 1 ảnh
        upload.single("avatar")(req, res, async function (err) {
            const id = req.params.id;
            const { id_room } = req.body;
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
                    await existImg.update({ url_banner: imageUrl, name_banner: req.file.filename, id_room: id_room })
                }else{
                    await existImg.update({ id_room: id_room })
                }
                return res.status(200).json({ message: `Cập nhật thành công`});
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteRoom = async (req, res) => {
    try {
        const id = req.params.id;
        const existRoom = await Room.findByPk(id);
        if(!existRoom){
            return res.status(201).json({message: 'Không tìm thấy phòng.'});
        }else{
            await existRoom.destroy();
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteImgRoom = async (req, res) => {
    try {
        const id = req.params.id;
        const existImg = await ImgRoom.findByPk(id);

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
    getRoom,
    addRoom,
    addImgRoom,
    updateRoom,
    updateStatusRoom,
    updateImgRoom,
    deleteRoom,
    deleteImgRoom
    
}