import { NextFunction, Request, RequestHandler, Response } from 'express';
import multer from 'multer';

export default function upload(field: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const multerUpload = multer({ storage: multer.memoryStorage() });
    const singleFile = multerUpload.single(field);
    const handledFile = singleFile as RequestHandler;
    return handledFile(req, res, next);
  };
}
