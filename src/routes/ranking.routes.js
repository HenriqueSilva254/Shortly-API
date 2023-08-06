import { Router } from "express";
import { getRanking } from "../controllers/ranking.controller.js";

const ranking = Router()

ranking.get("/ranking", getRanking)

export default ranking