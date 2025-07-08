import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import { authEmailSchema } from '../schemas/authSchemas.js';



const authRouter = express.Router();

authRouter.post(
    "/register",
    validateBody(authRegisterSchema),
    authControllers.registerController

);

authRouter.get("/verify/:verificationToken", authControllers.verifyController);

authRouter.post("/verify", validateBody(authEmailSchema), authControllers.resendVerifyController);

authRouter.post(
    "/login",
    validateBody(authLoginSchema),
    authControllers.loginController

);

authRouter.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    authControllers.updateAvatarController
);

authRouter.get("/current", authenticate, authControllers.getCurrentController);

authRouter.post("/logout", authenticate, authControllers.logoutController);


export default authRouter;