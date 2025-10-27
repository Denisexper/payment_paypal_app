import { Router } from "express";
import { paymentController } from "../controllers/payment.controller.js";

const router = Router()

const controller = new paymentController()


router.get("/create-pay", controller.create_pay)

router.get("/process-pay", (req, res) => res.send("process"))

router.get("/cancel-pay", (req, res) => res.send("canceled"))





export default router;