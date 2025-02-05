import express from 'express'
import { loginUser, registerUser, getUserDetails, updateUserDetails,UserContact, userForgotPassword, userverifyotp, updatePassword, resendOtp } from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'


const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getUserDetail',authUser,getUserDetails)
userRouter.post('/updateUserDetail',authUser,updateUserDetails)
userRouter.post('/usercontact',authUser,UserContact)
userRouter.post('/userforgotpassword',userForgotPassword)
userRouter.post('/userverifyotp',userverifyotp)
userRouter.post('/userupdatepassword',updatePassword)
userRouter.post('/userresendotp',resendOtp)



export default userRouter