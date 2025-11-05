import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import { Request, Response } from "express";

const app = express()
const viewsPath = path.join(__dirname, 'view');

nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app,
    watch: true,
})

app.get("/", (req: Request, res: Response) => {
    res.render("index.html")
})

app.listen(3000, "0.0.0.0", () => {
    console.log("server listen")
})