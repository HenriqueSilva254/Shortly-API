import { Router } from "express";
import { tokenValidation } from "../middlewares/validationAuth.js";
import { postUrl } from "../controllers/urlsController.js";

const Urlrouter =  Router()

Urlrouter.post('/urls/shorten', tokenValidation, postUrl)

export default Urlrouter