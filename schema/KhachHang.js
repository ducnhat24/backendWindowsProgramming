import mongoose from 'mongoose';
const { Schema } = mongoose;

const KhachHangSchema = new Schema({
  MaKhachHang: { type: String, required: true, unique: true },
  HoTen: { type: String },
  SoDienThoai: { type: String },
  DiaChi: { type: String },
  isSaved: { type: Boolean, default: false },
  MaDuAn: { type: String },
});

const KhachHang = mongoose.model('KhachHang', KhachHangSchema);
export default KhachHang;