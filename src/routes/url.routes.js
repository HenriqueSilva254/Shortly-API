import { Router } from "express";
import { tokenValidation } from "../middlewares/validationAuth.js";
import { getShortly, getUrl, postUrl } from "../controllers/urlsController.js";

const Urlrouter =  Router()

Urlrouter.post('/urls/shorten', tokenValidation, postUrl)
Urlrouter.get("/urls/:id", getUrl)
Urlrouter.get("/urls/open/:shortUrl", getShortly)

export default Urlrouter