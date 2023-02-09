import { Schema, model } from 'mongoose';

const schema = new Schema({
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
    type: Array,
    default: []
  },
  mixtapes: {
    type: Array,
    default: []
  },
  singles: {
    type: Array,
    default: []
  }
});

export default model('artist', schema);
