import express from "express";
import { Request, Response } from "express";

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send("Test")
})

app.listen(3000, "0.0.0.0", () => {
    console.log("server listen")
})