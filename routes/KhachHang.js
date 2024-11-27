import express from 'express';
import KhachHang from '../schema/KhachHang.js';

const KhachHangRouter = express.Router();

KhachHangRouter.get('/allnames', async (req, res) => {
    try {
        const maDuAn = req.query.maduan;
        const khachHang = await KhachHang.find({ MaDuAn: maDuAn });
        res.json(khachHang);
    }
    catch (error) {
        res.json({ message: error });
    }
}
);

export default KhachHangRouter;