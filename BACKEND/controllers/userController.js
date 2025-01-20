import validator from 'validator'
import bcrypt from 'bcrypt'
import moment from "moment"
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {sendContact, sendMail} from '../middleware/sendMail.js'
import otpmodel from '../models/otpmodel.js'
import sendMailforgot from '../middleware/forgotPassword.js'

// API for register user

const registerUser = async (req, res) => {
    try {
        const { name, email, password,cpassword } = req.body
        //checking any field is not empty
        if (!name || !password || !email) {
            return res.json({ success: false, message: "Please Enter All Details" })
        }
        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        //validating email with 5 or more long

        const emailPattern = /^[a-zA-Z0-9.]{5,}@gmail\.com$/;

        if(!emailPattern.test(email)){
            return res.json({success: false,message:"Enter a valid email with 5 or more long characters"})
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        //validating spassword and Confirm password same or not
        if (cpassword !== password) {
            return res.json({ success: false, message: "Password and Confirm Password does not same" })
        }

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating user data to save in database
        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)

        // saving data to the database
        const user = await newUser.save()

        //send mail to user

        sendMail(email,"welcome to novacare website","",`<b>Hello ${name},thank you for successfully sign up to our website<b>`)

        //creating joken

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: true, message: error.message })
    }
}


// API for user login 

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        //checking any field is not empty
        if (!password || !email) {
            return res.json({ success: false, message: "Please Enter All Details" })
        }

        //validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }

        //validating email with 5 or more long

        const emailPattern = /^[a-zA-Z0-9.]{5,}@gmail\.com$/;

        if(!emailPattern.test(email)){
            return res.json({success: false,message:"Enter a valid email with 5 or more long characters"})
        }

        if (!user) {
            return res.json({ success: false, message: "user does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Password is incorrect" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getUserDetails=async (req,res)=>{
    try {
        const {userId}=req.body
    const userData=await userModel.findById(userId).select('-password')

    res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api for updating user details

const updateUserDetails=async (req,res)=>{
    try {
        console.log(req.body)
        const { userId, name, phone, address, dob, gender } = req.body
        console.log(req.body)


        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data is missing" })
        }

        let parsedAddress;
        try {
            parsedAddress = address ? JSON.parse(address) : "";
        } catch (parseError) {
            return res.json({ success: false, message: "Invalid address format" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender })

        res.json({ success: true, message: "profile updated Successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//    API for send message to email for contact page

const UserContact=async (req,res)=>{

    try {
        const {username,email,phone,message}=req.body
        sendContact(email,"Message For NovaCare","",`From : ${email} <br> <br> ${message} <br> <b>Thank You,<br> ${username}</b>`)
        res.json({success:true,message:"Email Sent Successfully"})
        console.log("email sent",email)
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


// function for otp generator
const otpgenerator=async ()=>{
    const otp=Math.floor(1000+Math.random()*9000)
    const expiry=Date.now() + 5*60*1000

    return {otp,expiry}
}

// Api for the user forgot password
const userForgotPassword= async (req,res)=>{

    const {email}=req.body

    const data = await userModel.findOne({email})

    if(!data){
        res.json({success:false,message:"user does not exist"})
    }

    const {otp,expiry}=await otpgenerator()

    try {
        const otpdata={
            email,
            otp,
            expiry
        }
    
        const newotp= new otpmodel(otpdata)
        await newotp.save()

        const emailText = `<pre>Dear ${data.name},

We received a request to reset your password. To proceed, please use the following one-time password (OTP):

Your OTP: <b>${otp}</b>

This OTP is valid for 5 minutes. If you did not request a password reset, please ignore this message.

Best regards,
The NovaCare Team</pre>`

    await sendMailforgot(email,"Otp for forgot password","",emailText )

    res.json({success:true,message:"Otp sent to your email"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }



}

// Api for verify user otp

const userverifyotp=async (req,res)=>{
    const {email,otp}=req.body
    console.log(email,otp)
    try {
        const data=await otpmodel.findOne({email})
        if(!data){
           return res.json({success:false,message:"email is not found in the otp database"})
        }

        console.log(data.email,data.otp)
        const currentTime=moment().valueOf()

        console.log("exp:"+data.expiry)
        console.log("exp:"+currentTime)


        if(currentTime > data.expiry){
            console.log("expires")
            return res.json({success:false,message:"Otp has been expired"})
        }

        if(Number(otp)=== Number(data.otp)){
            console.log("same")
            await otpmodel.deleteOne({email})
            res.json({success:true,message:"otp verified successfully"})

        }else{
            res.json({success:false,message:"Invalid OTP"})
        }



    } catch (error) {
        console.log("catch error",error)
        res.json({success:false,message:error.message})
    }
}

// Api for the update password

const updatePassword=async (req,res)=>{
    const {email,newpassword}=req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const newHashedPassword = await bcrypt.hash(newpassword, salt)

        const data= await userModel.updateOne({email},{ $set: { password: newHashedPassword }})
        if(!data){
            console.log("user not found")
            res.json({success:false,message:"user not found"})
        }else{
            console.log("updated")
            res.json({success:true,message:"password updated successfully"})
        }
    } catch (error) {
        console.log("catch error",error)
        res.json({success:false,message:error.message})
    }
}

// Api for the resend otp

const resendOtp = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if an OTP already exists for the email
      const existingemail = await otpmodel.findOne({ email });
      if (existingemail) {
        await otpmodel.deleteOne({ email });
      }
  
      // Check if the user exists
      const data = await userModel.findOne({ email });
      if (!data) {
        return res.json({ success: false, message: "User does not exist" });
      }
  
      // Generate a new OTP
      const { otp, expiry } = await otpgenerator();
  
      const otpdata = {
        email,
        otp,
        expiry,
      };
  
      const newotp = new otpmodel(otpdata);
      await newotp.save();
  
      // Prepare the email text
      const emailText = `<pre>Dear ${data.name},
  
  We received a request to reset your password. To proceed, please use the following one-time password (OTP):
  
  Your OTP: <b>${otp}</b>
  
  This OTP is valid for 5 minutes. If you did not request a password reset, please ignore this message.
  
  Best regards,
  The NovaCare Team</pre>`;
  
      // Send the email
      await sendMailforgot(email, "OTP for Forgot Password", "", emailText);
  
      // Respond with success
      return res.json({ success: true, message: "OTP sent to your email" });
  
    } catch (error) {
      console.error(error);
      return res.json({ success: false, message: error.message });
    }
  };
  





export { registerUser, loginUser, getUserDetails, updateUserDetails,UserContact,userForgotPassword, userverifyotp, updatePassword, resendOtp}