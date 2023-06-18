import  { User } from "../models/user.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async(req , res , next)=>{
    try {
        const {email , password} = req.body;

        const user = await User.findOne({email}).select("+password");
    
    
        if(!user) return next(new ErrorHandler("Register First" , 404));
    
    
        const isMatch = await bcrypt.compare(password , user.password);
    
        if(!isMatch) return next(new ErrorHandler("Invalid E-mail or Password" , 400));
    
        sendCookie(user , res , `Welcome back , ${user.name}` , 200);
    
    } catch (error) {
        next(error);
    }
}
export const register  = async (req , res , next)=>{
    try {
        const {name , email , password} = req.body;
    
        let userhai = await User.findOne({email});
    
        if(userhai) return next(new ErrorHandler("User Already exist" , 404));
    
        const hashedPassword = await bcrypt.hash(password , 10);
    
        const user =  await User.create({
            name,
            email,
            password:hashedPassword
        });
        sendCookie(user , res , "Registered SuccessFully" , 201);
    } catch (error) {
        next(error);
    }
}
export const getMyProfile =  (req , res)=>{

    res.status(200).json({
        success:true,
        user: req.user,
    })
};

export const logout = (req , res)=>{
    res.status(200).cookie("token" , "" , {
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure:process.env.NODE_ENV === "DEVELOPMENT" ? false : true
    })
    .json({
        success:true,
    })
}
