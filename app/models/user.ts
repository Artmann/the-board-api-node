import { model, Schema } from 'mongoose';

const User = model('User', new Schema({
  email: String,
  password: String,
  name: String
}));

export default User;