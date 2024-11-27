import mongoose from 'mongoose';
const { Schema } = mongoose;

const NhanVienSchema = new Schema({
  MaNVDuAn: { type: String, required: true, unique: true },
  MaNV: { type: String },
  HoTen: { type: String },
  GioiTinh: { type: String },
  NgaySinh: { type: Date },
  DiaChi: { type: String },
  SDT: { type: String },
  Email: { type: String },
  TrangThai: { type: String },
  PhongBan: { type: String },
  CCCD: { type: String },
  MaDuAn: { type: String }, 
  AnhDaiDien: { type: String },
  isSaved: { type: Boolean, default: false },

});

const NhanVien = mongoose.model('NhanVien', NhanVienSchema);
export default NhanVien;