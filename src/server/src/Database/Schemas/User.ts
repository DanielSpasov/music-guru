import { Schema, model, InferSchemaType } from 'mongoose';

const UserSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
      maxlength: 8,
      immutable: true
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
    created_at: {
      type: Date,
      immutable: true,
      default: () => Date.now()
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

type IUser = InferSchemaType<typeof UserSchema>;

export default model<IUser>('User', UserSchema);
