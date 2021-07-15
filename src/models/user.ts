import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required:true },
  username: { type: String, required:true },
  sons: [{
    type: Schema.Types.ObjectId,
    ref: 'Son'
  }],
  createdAt: { type: Date, default: Date.now },
  updateAt: Date
});

export default model('User', UserSchema)