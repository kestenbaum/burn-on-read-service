import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import { v4 } from "uuid";
import { burnOnReadMiddleware } from "./middlewares/burnOnReadMiddleware";
import { BurnRequest, messages } from "./types";
import type { Request, Response } from "express";
import { promises as fs} from "fs";

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

let user = ""

app.post("/create", (req: Request, res: Response) => {
    user = req.body.message;
    const messageId = v4();
    messages[messageId] = user.trim();

    const shareLink = `${req.protocol}://${req.get('host')}/message/${messageId}`;
    fs.writeFile("example.txt", shareLink);
    res.render('link.html', { shareLink });
    console.log(`This is a userInput: ${user}`);
})

app.get('/message/:id', 
    burnOnReadMiddleware,
    (req: Request, res: Response) => {
        res.render('read.html', { user });
    }
);


app.listen(PORT, "0.0.0.0", () => {
    console.log("server listen")
})