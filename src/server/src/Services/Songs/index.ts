import { default as patch } from './patch';
import { default as del } from './del';
import { default as get } from './get';
export const song = {
  patch,
  del,
  get
};

import { delVerse, patchVerse, postVerse } from './Verses';
export const verses = {
  del: delVerse,
  patch: patchVerse,
  post: postVerse
};
