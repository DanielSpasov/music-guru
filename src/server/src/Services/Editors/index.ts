import { default as addEditor } from './post';
import { default as delEditor } from './del';
import { default as fetch } from './fetch';

export const editors = {
  post: addEditor,
  del: delEditor,
  fetch
};
