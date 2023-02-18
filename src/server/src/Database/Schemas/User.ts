import { Schema, model } from 'mongoose';

import { IUser } from '../../Types/User';

const UserSchema = new Schema<IUser>(
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
    toJSON: {
      transform: (_, data) => {
        delete data.password;
        delete data._id;
        delete data.__v;
        return data;
      }
    }
  }
);

export default model<IUser>('user', UserSchema);
