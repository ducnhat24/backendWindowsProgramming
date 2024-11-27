import mongoose from 'mongoose';
const { Schema } = mongoose;

const LoiMauSchema = new Schema({
  MaHieu: { type: String, required: true, unique: true },
  TenLoi: { type: String },
  GiaBan: { type: Number },
  isSaved: { type: Boolean, default: false },

});

const LoiMau = mongoose.model('LoiMau', LoiMauSchema);
export default LoiMau;