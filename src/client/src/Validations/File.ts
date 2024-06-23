import { z } from 'zod';

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const fileSize = (x: number) => {
  const base = (Math.log(x) / Math.log(1000)) | 0;
  const size = (x / Math.pow(1000, base)).toFixed(2);
  const unit = base ? 'kMGTPEZY'[base - 1] + 'B' : 'Bytes';
  return `${size} ${unit}`;
};

export const FileSchema = z
  .instanceof(File, { message: 'File is required.' })
  .refine(
    file => file?.size <= MAX_FILE_SIZE,
    `Max file size is ${fileSize(MAX_FILE_SIZE)}.`
  )
  .refine(
    file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    `Only ${ACCEPTED_IMAGE_TYPES.map(x => `.${x.split('image/')[1]}`).join(
      ', '
    )} files are accepted.`
  );

export const OptionalFileSchema = z
  .union([
    z
      .instanceof(FileList, { message: 'what' })
      .refine(files => files.length === 0, 'Onlt one file is accepted.'),
    FileSchema,
    z.null()
  ])
  .optional();
