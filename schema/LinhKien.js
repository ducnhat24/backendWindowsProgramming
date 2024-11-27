import mongoose from 'mongoose';
const { Schema } = mongoose;

const LinhKienSchema = new Schema({
  MaHieuDuAn: { type: String, required: true, unique: true },
  MaHieu: { type: String },
  TenLinhKien: { type: String },
  GiaBan: { type: Number },
  MaDuAn: { type: String },
  isSaved: { type: Boolean, default: false },

});

const LinhKien = mongoose.model('LinhKien', LinhKienSchema);
export default LinhKien;