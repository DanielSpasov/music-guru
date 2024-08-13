import { NextFunction, Request, RequestHandler, Response } from 'express';
import multer from 'multer';

const upload =
  (field: string) => (req: Request, res: Response, next: NextFunction) => {
    const multerUpload = multer({ storage: multer.memoryStorage() });
    const singleFile = multerUpload.single(field);
    const handledFile = singleFile as RequestHandler;
    return handledFile(req, res, next);
  };

export default upload;
