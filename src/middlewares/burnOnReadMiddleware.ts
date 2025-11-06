import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

export const burnOnReadMiddleware =  (req: Request, res: Response, next: NextFunction) => {
  const filePath = path.join(process.cwd(), 'example.txt');

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error:', err);
      else console.log('example.txt deleted');
    });
  }

  next();
}