import express from "express";
import {User} from "../models/user.js"
import {isAuthenticated }from "../middlewares/auth.js"
import { getMyProfile , login, logout, register } from "../controllers/user.js";

const router = express.Router();

router.post("/new" , register);

router.post("/login" , login);

router.get("/logout" , isAuthenticated , logout);

router.get("/me" , isAuthenticated , getMyProfile);


export default router;
