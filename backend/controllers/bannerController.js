const db = require("../models");
const Banner = db.banner;
const Amin = db.admin;

const getBanner = async (req, res) => {
    try {
        const banner = await Banner.findAll();
        res.json(banner);
    } catch (error) {
        console.log(error);
    }
}

const addBanner = async (req, res) => {
    const id = req.params.id;
    const {title_banner, content_banner} = req.body;
    const exsitAdmin = await Amin.findByPk(id);
    if(exsitAdmin){
        try {
            const exsitTitle = await Banner.findOne({ where: {title_banner: title_banner}});
            if(exsitTitle){
                res.status(400).json({messsage: 'Tiêu đề đã tồn tại'});
            }else{
                const banner = await Banner.create({
                    title_banner: title_banner,
                    content_banner: content_banner,
                })
                res.status(200).json({messsage: 'Thêm banner thành công.'});
            };
        } catch (error) {
            console.log(error);
        }
    }else{
        res.status(400).json({messsage: 'Tài khoản Admin không tồn tại'});
    }
}

const updateBanner = async (req, res) => {
    const {title_banner, content_banner} = req.body;
    const {idBanner, idAdmin} = res.params.id;
    const exsitBanner = await Banner.findByPk(idBanner);
    const exsitAdmin = await Amin.findByPk(idAdmin);
    if(exsitAdmin){
        if(exsitBanner){
            try {
            const exsitTitle = await Banner.findOne({ where: {title_banner: title_banner}});
            if(exsitTitle){
                res.status(400).json({messsage: 'Tiêu đề đã tồn tại'});
            }else{
                exsitBanner.title_banner = title_banner,
                exsitBanner.content_banner = content_banner;
                await exsitBanner.save();
                res.status(200).json({ message: "Cập nhật banner thành công" });
            }
            } catch (error) {
                console.log(error);
            }
        }else{
        res.status(400).json({messsage: 'Không tìm thấy banner.'});
        }
    }else{
        res.status(400).json({messsage: 'Tài khoản Admin không tồn tại'});
    }
}

module.exports = {
    getBanner,
    updateBanner,
}