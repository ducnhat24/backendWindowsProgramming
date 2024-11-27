import express from 'express';
import LinhKien from '../schema/LinhKien.js';

const LinhKienRouter = express.Router();

LinhKienRouter.get('/all', async (req, res) => {
    try {
        const maDuAn = req.query.maduan;
        const linhKien = await LinhKien.find({ MaDuAn: maDuAn });
        res.json(linhKien);
    }
    catch (error){
        res.json({ message: error });
    }
});

export default LinhKienRouter;