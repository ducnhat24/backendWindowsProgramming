import express from 'express';
import CongViec from '../schema/CongViec.js';

const CongViecRouter = express.Router();

CongViecRouter.get('/all', async (req, res) => {
    try {
        const maDuAn = req.query.maduan;
        const isSaved = req.query.issaved;
        if (isSaved) {
            // const congViec = await CongViec.find({ MaDuAn: maDuAn, isSaved: isSaved });
            const congViec = await CongViec.find({ MaDuAn: maDuAn });

            res.json(congViec);
        }
        else {
            const congViec = await CongViec.find({ MaDuAn: maDuAn });
            res.json(congViec);
        }
    }
    catch (error) {
        res.json({ message: error });
    }
});

CongViecRouter.post('/deletetask', async (req, res) => {
    try {
        const maCVDuan = req.query.macvduan;
        await CongViec.deleteOne({ MaCvDuAn: maCVDuan });
        res.json({ message: "Deleted Task" });
    }
    catch (error) {
        res.json({ message: error });
    }
});

CongViecRouter.post('/deleteproject', async (req, res) => {
    try {
        const maDuAn = req.query.maduan;
        await CongViec.deleteMany({ MaDuAn: maDuAn });
        res.json({ message: "Deleted Project" });
    }
    catch (error) {
        res.json({ message: error });
    }
}
);

CongViecRouter.get('/maxstt', async (req, res) => {
    try {
        const maDuAn = req.query.maduan;
        const maxSTT = await CongViec.find({ MaDuAn: maDuAn }).sort({ STT: -1 }).limit(1);
        // if maxSTT is empty, return 0
        console.log(maxSTT);
        if (maxSTT.length === 0) {
            console.log("Empty");
            res.json({ stt: 0 });
        }
        else {
            console.log("Not empty");
            res.json(maxSTT);
        }
    }
    catch (error) {
        res.json({ message: error });
    }
});

CongViecRouter.post('/inserttask', async (req, res) => {
    try {
        const congViec = new CongViec({
            MaCvDuAn: req.body.MaCVDuAn,
            STT: req.body.Stt,
            TenDichVu: req.body.TenDichVu,
            NgayThucHien: req.body.NgayThucHien,
            HoTenKH: req.body.HoTenKH,
            SDT: req.body.SDT,
            DiaChi: req.body.DiaChi,
            MaNV: req.body.MaNV,
            TenNV: req.body.TenNV,
            MaLinhKien: req.body.MaLK,
            TenLinhKien: req.body.TenLK,
            SoLuongLinhKien: req.body.SoLuongLK,
            MaLoi: req.body.MaLoi,
            TenLoi: req.body.TenLoi,
            SoLuongLoi: req.body.SoLuongLoi,
            PhiDichVu: req.body.PhiDichVu,
            GhiChu: req.body.GhiChu,
            MaDuAn: req.body.MaDuAn,
            isSaved: false
        });
        await congViec.save();
        res.json(congViec);
    }
    catch (error) {
        res.json({ message: error });
    }
});

export default CongViecRouter;
