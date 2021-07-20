import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from "bcryptjs";
export interface IUser extends Document {
  sons:any;
  roles: any;
  username: string
  email: string
  password: string
  encryptPassword(password: string): Promise<string>
  validatePassword(password:string): Promise<boolean>
  validateId(id:string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true, 
  },
  dni: { 
    type: String, 
    required: true, 
  },
  password: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    lowercase: true,
    required: true 
  },
  sons: [{
    type: Schema.Types.ObjectId,
    ref: 'Son'
  }],
  roles:[{
    ref:"Role",
    type: Schema.Types.ObjectId
  }]
},{
  timestamps:true,
  versionKey:false
})

UserSchema.methods.encryptPassword = async (password:string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

UserSchema.methods.validatePassword = async function (password:string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.validateId = async function (id:string): Promise<boolean> {
  return await Types.ObjectId.isValid(id)
}

export default model<IUser>('User', UserSchema)