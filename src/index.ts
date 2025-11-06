import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import router from "./routes/index"
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

app.use("/", router)

app.listen(PORT, "0.0.0.0", () => {
    console.log("server listen")
})