import { Schema, model } from 'mongoose';
import transformUser from '../../Transforms/User';

const schema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
      maxlength: 8
    },
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      required: true,
      readonly: true
    }
  },
  {
    toJSON: { transform: transformUser }
  }
);

export default model('user', schema);
