import express from "express"
import { 
    getProfile, 
    login, 
    logout, 
    register, 
    updateUser 
} from "../controllers/auth.controller.js"
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/profile",protectRoute,getProfile)
router.post("/update",protectRoute,updateUser)



export default router