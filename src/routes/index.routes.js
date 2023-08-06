import { Router } from "express";
import userRouter from "./user.routes.js";
import Urlrouter from "./url.routes.js";
import ranking from "./ranking.routes.js";

const router = Router()

router.use(userRouter);
router.use(Urlrouter)
router.use(ranking)

export default router