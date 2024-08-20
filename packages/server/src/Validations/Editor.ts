import { z } from 'zod';

export const EditorSchema = z.string().uuid();
export const EditorsSchema = z.array(EditorSchema);
