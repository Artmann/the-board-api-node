import { model, Schema } from 'mongoose';

const Board = model('Board', new Schema({
  columns: [String],
  name: String,
  swimLanes: [String],
  userId: String
}));

export default Board;