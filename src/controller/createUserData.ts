 import { Request, Response } from "express";
 import { v4 } from "uuid";
 import path from "node:path";
 import fs from "fs"
 
 export async function createUserData  (req: Request, res: Response) {
    let userName = req.body.message.trim();
    const messageId = v4();

    const userLink = `${req.protocol}://${req.get('host')}/message/${messageId}`;

    let data = {
        url: userLink,
        name: userName
    }

    const parsed = JSON.stringify(data, null)
    await fs.promises.writeFile(path.join(process.cwd(), 'data.json'), parsed, 'utf8');
    res.render('link.html', { userLink })
}