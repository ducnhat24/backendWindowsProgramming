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
        const oldProjectID = req.body.OldProjectID;
        const newProjectID = req.body.Project.ID;
        const newProjectName = req.body.Project.Name;
        const timeCreated = req.body.Project.TimeCreate;
        const duAn = new DuAn({
            MaDuAn: newProjectID,
            TenDuAn: newProjectName,
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
        const maCongViecDuAnBase = newProjectName + timeCreated + '_';
        for (let i = 0; i < congViec.length; i++) {
            const maCongViecDuAn = maCongViecDuAnBase + i;
            const congViecNew = new CongViec({
                MaCvDuAn: maCongViecDuAn,
                STT: congViec[i].STT,    
                TenDichVu: congViec[i].TenDichVu,
                NgayThucHien: congViec[i].NgayThucHien,
                HoTenKH: congViec[i].HoTenKH,
                SDT: congViec[i].SDT,
                DiaChi: congViec[i].DiaChi,
                MaNV: congViec[i].MaNV,
                TenNV: congViec[i].TenNV,
                MaLinhKien: congViec[i].MaLinhKien,
                TenLinhKien: congViec[i].TenLinhKien,
                SoLuongLinhKien: congViec[i].SoLuongLinhKien,
                MaLoi: congViec[i].MaLoi,
                TenLoi: congViec[i].TenLoi,
                SoLuongLoi: congViec[i].SoLuongLoi,
                PhiDichVu: congViec[i].PhiDichVu,
                GhiChu: congViec[i].GhiChu,
                MaDuAn:  newProjectID,
                isSaved: congViec[i].isSaved
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
        const maNhanVienDuAnBase = newProjectName + timeCreated + '_';
        for (let i = 0; i < nhanVien.length; i++) {
            const nhanVienNew = new NhanVien({
                MaNVDuAn: maNhanVienDuAnBase + i,
                MaNV: nhanVien[i].MaNV,
                HoTen: nhanVien[i].HoTen,
                GioiTinh: nhanVien[i].GioiTinh,
                NgaySinh: nhanVien[i].NgaySinh,
                DiaChi: nhanVien[i].DiaChi,
                SDT: nhanVien[i].SDT,
                Email: nhanVien[i].Email,
                PhongBan: nhanVien[i].PhongBan,
                CCCD: nhanVien[i].CCCD,
                TrangThai: nhanVien[i].TrangThai,
                MaDuAn: newProjectID,
                AnhDaiDien: nhanVien[i].AnhDaiDien,
                isSaved: true,
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

DuAnRouter.post('/deleteproject', async (req, res) => {
    try {
        const projectID = req.body.ID;
        console.log(projectID);
        await DuAn.deleteMany({ MaDuAn: projectID });
        await CongViec.deleteMany({ MaDuAn: projectID });
        await KhachHang.deleteMany({ MaDuAn: projectID });
        await LinhKien.deleteMany({ MaDuAn: projectID });
        await Loi.deleteMany({ MaDuAn: projectID });
        await NhanVien.deleteMany({ MaDuAn: projectID });
        res.json({ message: "Success" });
    }
    catch (error) {
        res.json({ message: error });
    }
}
);

export default DuAnRouter;