import { default as patch } from './patch';
import { default as del } from './del';
import { default as get } from './get';
export const song = {
  patch,
  del,
  get
};

import { addEditor, delEditor, fetchAvailable } from './Editors';
export const editors = {
  post: addEditor,
  del: delEditor,
  fetch: fetchAvailable
};

import { delVerse, patchVerse, postVerse } from './Verses';
export const verses = {
  del: delVerse,
  patch: patchVerse,
  post: postVerse
};
