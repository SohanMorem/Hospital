import express from "express"
import { addDoctor, AdminLogin, ListDoctor } from "../controllers/adminController.js"
import upload from "../middleware/multer.js"
import authAdmin from "../middleware/authAdmin.js"

const adminRouter=express.Router()

adminRouter.post("/addDoctor",authAdmin,upload.single("image"),addDoctor)
adminRouter.post("/adminLogin",AdminLogin)
adminRouter.get("/allDoctor",authAdmin,ListDoctor)

export default adminRouter