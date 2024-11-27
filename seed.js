// import LinhKienMau from './schema/LinhKienMau.js'; // Assuming models are defined in 'models.js'
// import LoiMau from './schema/LoiMau.js'; // Assuming models are defined in 'models.js'

// async function seedDatabase() {
//   try {
//     // Clear existing entries in LinhKien and Loi collections
//     await LinhKienMau.deleteMany({});
//     await LoiMau.deleteMany({});

//     // Insert LinhKien data
//     await LinhKienMau.insertMany([
//       {
//         MaHieu: "PJ-1178V",
//         TenLinhKien: "Bơm 600G Aquatec (PJ-1178V)",
//         GiaBan: 2200000,
//       },
//       {
//         MaHieu: "PJ-701V",
//         TenLinhKien: "Adapter dùng cho AR600-C-S-1 (PJ-701V)",
//         GiaBan: 1500000,
//       },
//       {
//         MaHieu: "PJ-884J",
//         TenLinhKien: "Bo nguồn dùng cho AR75-V-ET-1 (PJ-884J)",
//         GiaBan: 1400000,
//       },
//       {
//         MaHieu: "PJ-1033",
//         TenLinhKien: "Bơm dùng cho AR75-A-S-H1 (PJ-1033)",
//         GiaBan: 1500000,
//       },
//       {
//         MaHieu: "PJ-1584",
//         TenLinhKien: "Bơm 75G (PJ-1584)",
//         GiaBan: 1400000,
//       },
//       {
//         MaHieu: "PJ-885X",
//         TenLinhKien: "Bo nguồn cho ADR75-V-ET-1 (PJ-885X)",
//         GiaBan: 950000,
//       },
//       {
//         MaHieu: "PJ-1316VT",
//         TenLinhKien: "Vòi cơ dùng cho AR75-A-S-1E/M1 (PJ-1316VT)",
//         GiaBan: 950000,
//       },
//     ]);

//     // Insert Loi data
//     await LoiMau.insertMany([
//       {
//         MaHieu: "LX-054V-001",
//         TenLoi: "Lõi lọc PP1",
//         GiaBan: 295000,
//       },
//       {
//         MaHieu: "LX-209V-001",
//         TenLoi: "Lõi lọc PAC",
//         GiaBan: 393000,
//       },
//       {
//         MaHieu: "LX-292V-001",
//         TenLoi: "Lõi lọc PP5",
//         GiaBan: 216000,
//       },
//       {
//         MaHieu: "LX-054V-002",
//         TenLoi: "Lõi lọc RO Side stream(75GPD)",
//         GiaBan: 977000,
//       },
//       {
//         MaHieu: "LX-209V-002",
//         TenLoi: "Lõi lọc GAC",
//         GiaBan: 412000,
//       },
//       {
//         MaHieu: "LX-209V-003",
//         TenLoi: "Lõi lọc RO Side stream(600 GPD)",
//         GiaBan: 2042000,
//       },
//       {
//         MaHieu: "LX-292V-002",
//         TenLoi: "Lõi lọc Carbon Block",
//         GiaBan: 393000,
//       },
//     ]);

//     console.log('Seed data inserted successfully!');
//   } catch (error) {
//     console.error('Error seeding the database:', error);
//   }
// }

// export default seedDatabase;

import mongoose from 'mongoose';
import KhachHang from './schema/KhachHang.js'; // Assuming the KhachHang model is defined in 'KhachHang.js'
import DuAn from './schema/DuAn.js'; // Assuming the DuAn model is defined in 'DuAn.js'
import LinhKien from './schema/LinhKien.js'; // Assuming the LinhKien model is defined in 'LinhKien.js'
import Loi from './schema/Loi.js'; // Assuming the Loi model is defined in 'Loi.js'
import NhanVien from './schema/NhanVien.js'; // Assuming the NhanVien model is defined in 'NhanVien.js'
import CongViec from './schema/CongViec.js';

async function seedDatabase() {
  try {
    // Clear existing entries in KhachHang collection
    await KhachHang.deleteMany({});
    await DuAn.deleteMany({});
    await LinhKien.deleteMany({});
    await Loi.deleteMany({});
    await NhanVien.deleteMany({});
    await CongViec.deleteMany({});


    // Insert KhachHang data
    await KhachHang.insertMany([
      {
        MaKhachHang: 'KH001',
        HoTen: 'Nguyen Van A',
        SoDienThoai: '0123456789',
        DiaChi: '123 Le Loi, Hanoi',
        isSaved: true,
        MaDuAn: 'DA001',
      },
      {
        MaKhachHang: 'KH002',
        HoTen: 'Tran Thi B',
        SoDienThoai: '0987654321',
        DiaChi: '456 Tran Hung Dao, Ho Chi Minh City',
        isSaved: true,
        MaDuAn: 'DA002',
      },
      {
        MaKhachHang: 'KH003',
        HoTen: 'Le Van C',
        SoDienThoai: '0112233445',
        DiaChi: '789 Nguyen Trai, Da Nang',
        isSaved: true,
        MaDuAn: 'DA003',
      },
    ]);

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } 
}

export default seedDatabase;
