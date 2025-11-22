import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";
import { authRequired } from "../auth/authMiddleware.js";

const router = Router()
const controller = new usersController()

router.get("/get-users", authRequired, controller.getUsers)

//login and register
router.post("/login", controller.login)
router.post("/register", controller.register)


export default router
