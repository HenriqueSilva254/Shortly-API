import { Router } from "express";
import userRouter from "./user.routes.js";
import Urlrouter from "./url.routes.js";

const router = Router()

router.use(userRouter);
router.use(Urlrouter)

export default router