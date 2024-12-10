import Link from "../models/link.model.js"
import Content from "../models/content.model.js"
import hashString from "../utils/hashString.js"

export const shareBrain = async(req, res) => {
  try{
    const userId = req.user._id;
    let link = await Link.findOne({userId})
    console.log("In share brain controller")

    if(link){
      return res.status(201).json(link.hash)
    }

    const hash =  hashString()

    link = await Link.create({userId, hash})
    await link.save()
    res.json(hash)
    

  }catch(error){
    console.log(`Error in shareBrain contoller ${error.message}`)
    res.status(500).json({error: `Internal server error`})
  }
}

export const getBrain = async(req, res) => {
  try{
    const hash = req.params.hash;
    const link = await Link.findOne({hash}).populate("userId", "username")
    if(!link){
      return res.status(411).json({error: `Incorrect link, brain not found`})
    }
    const contents = await Content.find({userId:link.userId})

    res.json({
      username: link.userId.username,
      contents
    })

  }
  catch(error){
    console.log(`Error in getBrain contoller ${error.message}`)
    res.status(500).json({error: `Internal server error`})
  }
}