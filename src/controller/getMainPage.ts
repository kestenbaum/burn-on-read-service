import { Request, Response } from "express"

export function getRenderMainPage (req: Request, res: Response)  {
    res.render("index.html")
}