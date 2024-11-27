import mongoose from 'mongoose';
const { Schema } = mongoose;

const LinhKienMauSchema = new Schema({
  MaHieu: { type: String, required: true, unique: true },
  TenLinhKien: { type: String },
  GiaBan: { type: Number },
  isSaved: { type: Boolean, default: false },

});

const LinhKienMau = mongoose.model('LinhKienMau', LinhKienMauSchema);
export default LinhKienMau;