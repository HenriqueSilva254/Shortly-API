import { Router } from "express";
import { tokenValidation } from "../middlewares/validationAuth.js";
import { deleteUrl, getShortly, getUrl, getUserME, postUrl } from "../controllers/urlsController.js";

const Urlrouter =  Router()

Urlrouter.post('/urls/shorten', tokenValidation, postUrl)
Urlrouter.get("/urls/:id", getUrl)
Urlrouter.get("/urls/open/:shortUrl", getShortly)
Urlrouter.delete("/urls/:id", tokenValidation, deleteUrl)
Urlrouter.get("/users/me", tokenValidation, getUserME)

export default Urlrouter