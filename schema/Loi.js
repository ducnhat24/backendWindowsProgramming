import mongoose from 'mongoose';
const { Schema } = mongoose;

const LoiSchema = new Schema({
  MaHieuDuAn: { type: String, required: true, unique: true },
  MaHieu: { type: String },
  TenLoi: { type: String },
  GiaBan: { type: Number },
  MaDuAn: { type: String },
  isSaved: { type: Boolean, default: false },

});

const Loi = mongoose.model('Loi', LoiSchema);
export default Loi;