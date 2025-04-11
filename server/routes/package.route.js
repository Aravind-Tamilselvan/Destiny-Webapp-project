import express from "express"
import protectRoute from "../middleware/protectRoute.js"
import { 
    allReviews,
    getAllPackages, 
    getAllReviews, 
    getCustmoizablePackage, 
    getPackageType, 
    postPackage, 
    reviewPost, 
    updateHelpfulCount 
} from "../controllers/package.controller.js"

const router = express.Router()

router.post("/postPackage",protectRoute,postPackage)
router.get("/get-package",protectRoute,getAllPackages)
router.get("/get-by-package-type/:packageType",getPackageType)
router.get("/get-customizable-package",protectRoute,getCustmoizablePackage)
router.post("/review/:id",protectRoute,reviewPost)
router.post("/helpful/:id", protectRoute, updateHelpfulCount);
router.get("/get-reviews/:id",getAllReviews)
router.get("/all-reviews",allReviews)



export default router