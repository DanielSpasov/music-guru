import { Schema, model } from 'mongoose';
import { Artist } from '../../Validations/Artist';

const schema = new Schema<Artist>({
  uid: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 8
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    readonly: true
  },
  albums: {
    type: [],
    default: []
  },
  mixtapes: {
    type: [],
    default: []
  },
  singles: {
    type: [],
    default: []
  }
});

export default model('artist', schema);
