
import { Router } from "express";
import {authRegController,authLoginController} from "../Controllers/authControllers.js"
import hashPassword from "../middleWare/hashpassword.js";
const router= Router();
router.post("/register",hashPassword,authRegController);
router.post ("/login",authLoginController);

export default router;