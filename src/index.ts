import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import { v4 } from "uuid";
import { burnOnReadMiddleware } from "./middlewares/burnOnReadMiddleware";
import type { Request, Response } from "express";
import fs from "fs";

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001
const viewsPath = path.join(process.cwd(), 'src/view');

app.use(express.urlencoded({ extended: true }));

nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app,
    watch: true,
})

app.get("/", (req: Request, res: Response) => {
    res.render("index.html")
})

app.post("/create", async  (req: Request, res: Response) => {
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
})

app.get('/message/:id', 
    burnOnReadMiddleware,
    (req: Request, res: Response) => {
        const userName = (req as any).user; 
        res.render('read.html', { userName });
    }
);

app.listen(PORT, "0.0.0.0", () => {
    console.log("server listen")
})