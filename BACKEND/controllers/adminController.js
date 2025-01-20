
import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloundinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"


// Api for add doctor

const addDoctor=async (req,res)=>{

    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body
        const imageFile=req.file

        //validating details

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || ! address){
            return res.json({success:false,message:"Missing Details"})
        }

        // validate email

        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a valid email"})
        }

        //validating email with 5 or more long

        const emailPattern = /^[a-zA-Z0-9]{5,}@gmail\.com$/;

        if(!emailPattern.test(email)){
            return res.json({success: false,message:"Enter a valid email with 5 or more long characters"})
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)

        //upload image using cloundinary
        const imageUpload=await cloundinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl= imageUpload.secure_url


        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor= new doctorModel(doctorData)
        await newDoctor.save()

        console.log("doctor added")
        res.json({success:true,message:"doctor added successfully"})

        

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Api for admin login

const AdminLogin=async(req,res)=>{
    try {

        const {email,password}=req.body

         // validate email

         if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a valid email"})
        }

        //validating email with 5 or more long

        const emailPattern = /^[a-zA-Z0-9]{5,}@gmail\.com$/;

        if(!emailPattern.test(email)){
            return res.json({success: false,message:"Enter a valid email with 5 or more long characters"})
        }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const atoken=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,atoken})

        }else{
            res.json({success:false,message:"incorrect username or password"})
        }

        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}




const ListDoctor=async (req,res)=>{
    try {
        const doctorData=await doctorModel.find()
        res.json({success:true,doctorData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addDoctor,AdminLogin,ListDoctor}