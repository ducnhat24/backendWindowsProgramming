import express from 'express';
import NhanVien from '../schema/NhanVien.js';

const NhanVienRouter = express.Router();

NhanVienRouter.get('/all', async (req, res) => {
    try {
        const maDuAn = req.query.maduan;
        const nhanVien = await NhanVien.find({ MaDuAn: maDuAn });
        res.json(nhanVien);
    }
    catch (error) {
        res.json({ message: error });
    }
});

NhanVienRouter.post('/insert', async (req, res) => {
    try {
        console.log(req.body);
        const nhanVien = new NhanVien({
            MaNVDuAn: req.body.MaNhanVienDuAn,
            MaNV: req.body.MaNhanVien,
            HoTen: req.body.HoTen,
            GioiTinh: req.body.GioiTinh,
            NgaySinh: req.body.NgaySinh,
            DiaChi: req.body.DiaChi,
            SDT: req.body.SoDienThoai,
            Email: req.body.Email,
            PhongBan: req.body.PhongBan,
            CCCD: req.body.CCCD,
            TrangThai: req.body.TrangThai,
            MaDuAn: req.body.MaDuAn,
            AnhDaiDien: req.body.AnhDaiDien,
            isSaved: false,
        });
        console.log(nhanVien);

        await nhanVien.save();
        console.log("hihi")
        res.json(nhanVien);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});


export default NhanVienRouter;