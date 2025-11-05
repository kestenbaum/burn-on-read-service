import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import { v4 } from "uuid";
import { burnOnReadMiddleware } from "./middlewares/burnOnReadMiddleware";
import { BurnRequest, messages } from "./types";
import type { Request, Response } from "express";
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

app.post("/create", (req: Request, res: Response) => {
    const userInput = req.body.message;
    const messageId = v4();
    messages[messageId] = userInput.trim();

    const shareLink = `${req.protocol}://${req.get('host')}/message/${messageId}`;
    res.render('link.html', { shareLink });
})

app.get('/message/:id', 
    burnOnReadMiddleware,
    (req: BurnRequest, res: Response) => {
        res.render('read.html', {
            content: req.messageContent
        });
    }
);

app.listen(PORT, "0.0.0.0", () => {
    console.log("server listen")
})