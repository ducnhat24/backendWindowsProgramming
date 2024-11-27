import mongoose from 'mongoose';
const { Schema } = mongoose;

const CongViecSchema = new Schema({
  MaCvDuAn: { type: String, required: true, unique: true },
  STT: { type: Number },
  TenDichVu: { type: String },
  NgayThucHien: { type: Date },
  HoTenKH: { type: String },
  SDT: { type: String },
  DiaChi: { type: String },
  MaNV: { type: String },
  TenNV: { type: String },
  MaLinhKien: { type: String },
  TenLinhKien: { type: String },
  SoLuongLinhKien: { type: Number },
  MaLoi: { type: String },
  TenLoi: { type: String },
  SoLuongLoi: { type: Number },
  PhiDichVu: { type: Number },
  GhiChu: { type: String },
  MaDuAn: { type: String },
  isSaved: { type: Boolean, default: false },
});

const CongViec = mongoose.model('CongViec', CongViecSchema);
export default CongViec;