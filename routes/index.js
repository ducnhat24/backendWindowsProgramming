import express from 'express';
import LinhKienRouter from './LinhKien.js';
import NhanVienRouter from './NhanVien.js';
import CongViecRouter from './CongViec.js';
import LoiRouter from './Loi.js';
import DuAnRouter from './DuAn.js';
import KhachHangRouter from './KhachHang.js';

export function setupRoutes(app) {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.use('/linhkien', LinhKienRouter);
    app.use('/nhanvien', NhanVienRouter);
    app.use('/congviec', CongViecRouter);
    app.use('/loi', LoiRouter);
    app.use('/duan', DuAnRouter);
    app.use('/khachhang', KhachHangRouter);
}