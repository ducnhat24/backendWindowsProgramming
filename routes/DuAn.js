import express from 'express';
import DuAn from '../schema/DuAn.js';
import CongViec from '../schema/CongViec.js';
import KhachHang from '../schema/KhachHang.js';
import LinhKien from '../schema/LinhKien.js';
import Loi from '../schema/Loi.js';
import NhanVien from '../schema/NhanVien.js';

const DuAnRouter = express.Router();

DuAnRouter.get('/', async (req, res) => {
    try {
        const duAn = await DuAn.find();
        res.json(duAn);
    }
    catch (error) {
        res.json({ message: error });
    }
}
);

DuAnRouter.post('/insertproject', async (req, res) => {
    const duAn = new DuAn({
        MaDuAn: req.body.ID,
        TenDuAn: req.body.Name,
        NgayThucHien: req.body.TimeCreate,
        isSaved: true
    });

    try {
        //check if database has the same project
        const checkProject = await DuAn.find({ MaDuAn: req.body.maduan });
        if (checkProject.length > 0) {
            console.log("Project existed");
        }
        else {
            await duAn.save();
            res.json(duAn);
        }
    }
    catch (error) {
        console.log(error);
        res.json({ message: error });
    }
}
);
DuAnRouter.post('/insertprojectnotsaved', async (req, res) => {
    const duAn = new DuAn({
        MaDuAn: req.body.ID,
        TenDuAn: req.body.Name,
        NgayThucHien: req.body.TimeCreate,
        isSaved: false
    });

    try {
        //check if database has the same project
        const checkProject = await DuAn.find({ MaDuAn: req.body.maduan });
        if (checkProject.length > 0) {
            console.log("Project existed");
        }
        else {
            await duAn.save();
            res.json(duAn);
        }

        //return the projectID
        res.json(duAn);
    }
    catch (error) {
        console.log(error);
    }
}
);

DuAnRouter.post('/insertallfromtemp', async (req, res) => {
    try {
        const tempDuAnID = req.body.projectID;

        if (!tempDuAnID) {
            throw new Error("Missing 'projectID' in request body");
        }

        // Proceed with updates
        await DuAn.updateMany({ MaDuAn: tempDuAnID }, { isSaved: true });
        await CongViec.updateMany({ MaDuAn: tempDuAnID }, { isSaved: true });
        await KhachHang.updateMany({ MaDuAn: tempDuAnID }, { isSaved: true });
        await LinhKien.updateMany({ MaDuAn: tempDuAnID }, { isSaved: true });
        await Loi.updateMany({ MaDuAn: tempDuAnID }, { isSaved: true });
        await NhanVien.updateMany({ MaDuAn: tempDuAnID }, { isSaved: true });

        res.json({ message: "Success" });
    } catch (error) {
        console.error("Error in /insertallfromtemp:", error);
        res.status(500).json({ message: error.message });
    }
});

DuAnRouter.post('/saveprojectwithdifferentname', async (req, res) => {
    try {
        const oldProjectID = req.body.oldProjectID;
        const newProjectID = req.body.ID;
        const tempProjectID = req.body.Name;
        const timeCreated = req.body.TimeCreate;
        const duAn = new DuAn({
            MaDuAn: newProjectID,
            TenDuAn: tempProjectID,
            NgayThucHien: timeCreated,
            isSaved: true
        });
        //insert the new duAn to DuAn
        await duAn.save();
        //traverse through all tables, if the row has MaDuAn is the same as oldProjectID, copy that row then insert again with newProjectID
        const congViec = await CongViec.find({ MaDuAn: oldProjectID });
        const khachHang = await KhachHang.find({ MaDuAn: oldProjectID });
        const linhKien = await LinhKien.find({ MaDuAn: oldProjectID });
        const loi = await Loi.find({ MaDuAn: oldProjectID });
        const nhanVien = await NhanVien.find({ MaDuAn: oldProjectID });
        for (let i = 0; i < congViec.length; i++) {
            const congViecNew = new CongViec({
                MaDuAn: newProjectID,
                MaCVDuan: congViec[i].MaCVDuan,
                TenCongViec: congViec[i].TenCongViec,
                NguoiThucHien: congViec[i].NguoiThucHien,
                NgayBatDau: congViec[i].NgayBatDau,
                NgayKetThuc: congViec[i].NgayKetThuc,
                TienDo: congViec[i].TienDo,
                isSaved: true
            });
            await congViecNew.save();
        }
        for (let i = 0; i < khachHang.length; i++) {
            const khachHangNew = new KhachHang({
                MaDuAn: newProjectID,
                TenKhachHang: khachHang[i].TenKhachHang,
                DiaChi: khachHang[i].DiaChi,
                SoDienThoai: khachHang[i].SoDienThoai,
                isSaved: true
            });
            await khachHangNew.save();
        }
        for (let i = 0; i < linhKien.length; i++) {
            const linhKienNew = new LinhKien({
                MaDuAn: newProjectID,
                TenLinhKien: linhKien[i].TenLinhKien,
                SoLuong: linhKien[i].SoLuong,
                isSaved: true
            });
            await linhKienNew.save();
        }
        for (let i = 0; i < loi.length; i++) {
            const loiNew = new Loi({
                MaDuAn: newProjectID,
                TenLoi: loi[i].TenLoi,
                isSaved: true
            });
            await loiNew.save();
        }
        for (let i = 0; i < nhanVien.length; i++) {
            const nhanVienNew = new NhanVien({
                MaDuAn: newProjectID,
                TenNhanVien: nhanVien[i].TenNhanVien,
                ChucVu: nhanVien[i].ChucVu,
                SoDienThoai: nhanVien[i].SoDienThoai,
                Email: nhanVien[i].Email,
                DiaChi: nhanVien[i].DiaChi,
                NgaySinh: nhanVien[i].NgaySinh,
                GioiTinh: nhanVien[i].GioiTinh,
                isSaved: true
            });
            await nhanVienNew.save();
        }
        res.json({ message: "Success" });

    }
    catch (error) {
        res.json({ message: error });
    }
}
);

export default DuAnRouter;