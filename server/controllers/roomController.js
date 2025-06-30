
import hallModel from "../models/Hall.js";
import roomModel from "../models/Room.js";


export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerDay, amenities} = req.body;
    const hall = await hallModel.findOne({owner:req.auth.userId})

    if(!hall) return res.json({success:false,message:"No Hall Found"});

    //upload images to cloudinary
    const uploadImages=req.files.map(async (file)=>{
      const response = await cloudinart.uploader.upload(file.path);
    })
    //wait for all uploads to compelete
    const images = await Promise.all(uploadImages)
    await roomModel.create({
      hall:hall._id,
      roomType,
      pricePerDay:+pricePerDay,
      amenities:JSON.parse(amenities),
      images,
    })
    res.json({success:true,message:"Room Created Successfully"})

  } catch (error) {
   res.json({success:false,message:error.message})
  }
};


export const getRooms = async (req, res) => {
  try {
    const rooms = await roomModel.find({isAvailable:true}).populate({
      path:'hall',
      populate:{
        path:'owner',
        select:'image'
      }
    }).sort({createdAt:-1})
    res.json({success:true,rooms});
   
  } catch (error) {
   res.json({success:false,message:error.message})
  }
};


export const getOwnerRooms = async (req, res) => {
  try {
    const hallData = await hallModel({owner:req.auth.userId})
    const rooms = await roomModel.find({hall:hallData._id.toString()}).populate("hall");
    res.json({success:true,rooms});
   
  } catch (error) {
   res.json({success:false,message:error.message})
  }
};

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await roomModel.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


