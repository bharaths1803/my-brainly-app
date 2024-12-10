import Content from "../models/content.model.js"

export const addContent = async(req, res) => {
  const {link, type, title} = req.body;
  const userId = req.user._id;
  try{
    const content = await Content.create({
      link,
      type,
      title,
      userId
    })

    await content.save()

    res.status(201).json(content)
  }catch(error){
      console.log(`Error in addContent contoller ${error.message}`)
      res.status(500).json({error: `Internal server error`})
    }
}

export const deleteContent = async(req, res) => {
  const userId = req.user._id;
  try{
    const {contentId} = req.body;
    console.log("Content id", contentId)
    console.log("User id", userId)
    await Content.deleteOne({
      _id: contentId,
      userId
    })
    console.log("Deelte content backend")
    res.status(200).json({message: `Content deleted successfully`})
  }
  catch(error){
    console.log(`Error in deleteContent contoller ${error.message}`)
    res.status(500).json({error: `Internal server error`})
  }
}

export const getContents = async(req, res) => {
  const userId = req.user._id;
  try{
    const contents = await Content.find({userId}).populate("userId", "username")
    res.status(201).json(contents)

  }catch(error){
    console.log(`Error in getContent contoller ${error.message}`)
    res.status(500).json({error: `Internal server error`})
  }
}