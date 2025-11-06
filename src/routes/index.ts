import { Router } from "express";
import { getRenderMainPage } from "../controller/getMainPage";
import { createUserData } from "../controller/createUserData";
import { renderUserName } from "../controller/renderUserName";

const router = Router();

router.get("/", getRenderMainPage);
router.post("/create", createUserData)
router.get("/message/:id", renderUserName)

export default router;
