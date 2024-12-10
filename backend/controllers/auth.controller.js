import {z} from "zod";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {

  try{
    const isPassword = (password) => {
      const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ',', '.', '?', ':', '"', '{', '}', '|', '<', '>'];
      return specialCharacters.some(char => password.includes(char)) && [...password].some(char => char >= 'A' && char <= 'Z') && [...password].some(char => char >= 'a' && char <= 'z') && [...password].some(char => char >= '0' && char <= '9'); 
    }
  
    const requiredBody = z.object({
      username: z.string().min(3).max(100),
      password: z.string().min(6).max(25).refine(isPassword)
    })
  
    const parsedDataWithSuccess = requiredBody.safeParse(req.body)
  
    if(!parsedDataWithSuccess.success){
      return res.status(400).json({error: "Password must contain at least 6 character with 1 special character, 1 lowercase, 1 uppercase, and 1 digit"})
    }

    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(user){
      return res.status(400).json({error: `User already exists`})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      username,
      password: hashedPassword
    })

    if(newUser){
      generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()
      res.status(201).json({
        _id: newUser._id,
        username: username
      })
    }

    else{
      res.status(400).json({error: `Invalid user data`})
    }


  }catch(error){
    console.log(`Error in signup contoller ${error.message}`)
    res.status(500).json({error: `Internal server error`})
  }

}


export const login = async (req, res) => {
  try{

    const {username, password} = req.body;

    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error: `Invalid username or password`})
    }

    generateTokenAndSetCookie(user._id, res)
    res.status(201).json({
      _id: user._id,
      username: username
    })


  }catch(error){
    console.log(`Error in login contoller ${error.message}`)
    res.status(500).json({error: `Internal server error`})
  }

}


export const logout = async (req, res) => {
  try{
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({message: `Logged out successfully`})
  }catch(error){
    console.log(`Error in logout contoller ${error.message}`)
    res.status(500).json({error: `Internal server error`})
  }
}