import express from "express"
import { addDoctor, AdminLogin, ListDoctor, removeDoctor } from "../controllers/adminController.js"
import upload from "../middleware/multer.js"
import authAdmin from "../middleware/authAdmin.js"
import { changeAvailability } from "../controllers/doctorController.js"

const adminRouter=express.Router()

adminRouter.post("/addDoctor",authAdmin,upload.single("image"),addDoctor)
adminRouter.post("/adminLogin",AdminLogin)
adminRouter.post("/allDoctor",authAdmin,ListDoctor)
adminRouter.post("/available",authAdmin,changeAvailability)
adminRouter.post("/removeDoctor",authAdmin,removeDoctor)

export default adminRouter