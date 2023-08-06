import { Router } from "express";
import { tokenValidation } from "../middlewares/validationAuth.js";
import { deleteUrl, getShortly, getUrl, getUserME, postUrl } from "../controllers/urlsController.js";
import { validationSchemas } from "../middlewares/validationSchema.js";
import { urlSchema } from "../schemas/url.schema.js";

const Urlrouter =  Router()

Urlrouter.post('/urls/shorten',validationSchemas(urlSchema), tokenValidation, postUrl)
Urlrouter.get("/urls/:id", getUrl)
Urlrouter.get("/urls/open/:shortUrl", getShortly)
Urlrouter.delete("/urls/:id", tokenValidation, deleteUrl)
Urlrouter.get("/users/me", tokenValidation, getUserME)

export default Urlrouter