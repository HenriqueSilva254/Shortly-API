import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { signInSchema, signUpSchema } from "../schemas/user.schema.js";
import { validationSchemas } from "../middlewares/validationSchema.js";
import { tokenValidation } from "../middlewares/validationAuth.js";

const userRouter = Router()

// Cadastro
userRouter.post("/signup",validationSchemas(signUpSchema),  signUp);
// Login 
userRouter.post("/signin",validationSchemas(signInSchema), signIn)

export default userRouter