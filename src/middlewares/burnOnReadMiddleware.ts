import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';


export const burnOnReadMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const filePath = path.join(process.cwd(), 'data.json');

  if (fs.existsSync(filePath)) {
    const content = await fs.promises.readFile(filePath, 'utf8');
    const parsed = JSON.parse(content);

    (req as any).user = parsed.name;
    (req as any).link = parsed.url; 

    await fs.promises.unlink(filePath);
  }

  next();
}