// All Logic for login, register, adminLogin

import userModel from "../models/userModels.js";
import bcrypt, { genSalt } from "bcrypt"
import validator from "validator";
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login

const loginUser = async (req,res) => {
  try {
      const {email,password} = req.body;
    
      const user = await userModel.findOne({email});

    if(!user){
        return res.json({success:false,message:"User doesn't exists"})
       }
    
    const isMatch = await bcrypt.compare(password,user.password)   
    
    if(isMatch){
        const token = createToken(user._id)
        res.json({success:true,token})
    }
    else{
        res.json({success:false, message:"Invalid Credentials"})
    }

  } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
  }

}


//Route for user register

const registerUser = async (req,res) => {
   try {
      const {name, email, password} = req.body

       // Checking user already exists or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exists"})
        }
        
        // validating email format & strong password
        
        if(!validator.isEmail(email)){
             return res.json({success:false, message:"Please enter the valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})   
        }
        
        // Hashing user Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})


   } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
   }
}

//Route for admin login

const adminLogin = async () => {

}

export {loginUser,registerUser, adminLogin}