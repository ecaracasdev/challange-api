import { Schema, model } from 'mongoose';

const SonSchema = new Schema({
  firstName:{ type: String, required: true },
  lastName: { type: String, required: true },
  dni: { type: String, required:true },
  createdAt: { type: Date, default: Date.now },
  updateAt: Date
});

export default model('Son', SonSchema)