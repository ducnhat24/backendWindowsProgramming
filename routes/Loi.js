import express from 'express';
import Loi from '../schema/Loi.js';

const LoiRouter = express.Router();

LoiRouter.get('/all', async (req, res) => {
    try {
        const maDuAn = req.query.maduan;
        const loi = await Loi.find({ MaDuAn: maDuAn });
        res.json(loi);
    }
    catch (error) {
        res.json({ message: error });
    }
}
);

export default LoiRouter;