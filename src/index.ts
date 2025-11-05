import express from "express";
import nunjucks from "nunjucks";
import path from "path";

import type { Request, Response } from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
const viewsPath = path.join(__dirname, 'view');

nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app,
    watch: true,
})

app.get("/", (req: Request, res: Response) => {
    res.render("index.html")
})

app.post("/create", (req: Request, res: Response) => {
    const input = req.body.text;
    const message = "temporary-id";

    const shareLink = `http://${req.get('host')}/message/${message}`;

    res.render('link.html', { 
        shareLink,
    });
})

app.listen(3000, "0.0.0.0", () => {
    console.log("server listen")
})