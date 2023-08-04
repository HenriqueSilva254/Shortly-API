import { Router } from "express";
import { tokenValidation } from "../middlewares/validationAuth.js";
import { getUrl, postUrl } from "../controllers/urlsController.js";

const Urlrouter =  Router()

Urlrouter.post('/urls/shorten', tokenValidation, postUrl)
Urlrouter.get("/urls/:id", getUrl)

export default Urlrouter