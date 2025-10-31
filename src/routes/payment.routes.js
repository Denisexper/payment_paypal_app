import { Router } from "express";
import { paymentController } from "../controllers/payment.controller.js";

const router = Router()

const controller = new paymentController()


router.get("/create-order", controller.createOrder)

router.get("/capture-order", controller.captureOrder)

router.get("/cancel-order", controller.cancelPayment)





export default router;