import mongoose from 'mongoose';
const { Schema } = mongoose; 

const DuAnSchema = new Schema({
  MaDuAn: { type: String, required: true, unique: true },
  TenDuAn: { type: String },
  NgayThucHien: { type: Date },
  isSaved: { type: Boolean, default: false },

});

const DuAn = mongoose.model('DuAn', DuAnSchema);
export default DuAn;