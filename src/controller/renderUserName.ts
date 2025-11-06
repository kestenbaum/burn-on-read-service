import { Request, Response } from "express";

export function renderUserName (req: Request, res: Response)  {
    const userName = (req as any).user; 
    res.render('read.html', { userName });
}   