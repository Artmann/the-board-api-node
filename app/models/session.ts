import { model, Schema } from 'mongoose';

const Session = model('Session', new Schema({
  createdAt: Date,
  token: String,
  userId: String
}));

export default Session;