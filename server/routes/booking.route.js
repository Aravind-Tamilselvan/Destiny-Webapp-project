import express from "express"
import { checkoutSuccess, createCheckoutSession } from "../controllers/booking.controller.js"
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router()

router.post("/create-checkout-session",protectRoute,createCheckoutSession)
router.post("/checkout-success",protectRoute,checkoutSuccess)

export default router