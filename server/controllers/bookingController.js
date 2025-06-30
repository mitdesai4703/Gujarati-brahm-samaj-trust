import bookingModel from "../models/Booking.js";
import roomModel from "../models/Room.js";
import hallModel from "../models/Hall.js";


//Function to check availablity of room
const checkAvailability = async ({checkInDate,checkOutDate,room})=>{
  try{
    const bookings = await bookingModel.find({
      room,
      checkInDate:{$lte:checkOutDate},
      checkOutDate:{$gte:checkInDate},
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  }catch (error){
    console.log(error.message);
  }
}

export const checkAvailabilityAPI = async(req,res)=>{
  try{
    const {room,checkInDate,checkOutDate}= req.body;
    const isAvailable = await checkAvailability({checkInDate,checkOutDate,room});
    res.json({success:true,isAvailable})
  }catch(error){
    res.json({success:false,message:error.message})
  }
}

export const createBooking = async(req,res)=>{
  try{
    const{room,checkInDate,checkOutDate,guests}=req.body;
    const user=req.user._id;

    const isAvailable = await checkAvailability({checkInDate,checkOutDate,room});

    if(!isAvailable){
      return res.json({success:false, message:"Room is not available"})
    }
    const roomData = await roomModel.findById(room).populate("hall");
    let totalPrice = roomData.pricePerDay;

    const checkIn  = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff /(1000 * 3600 *24));

    totalPrice *=nights;
    const Booking = await bookingModel.create({
      user,
      room,
      hall:roomData.hall._id,
      guests:+guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    })

    res.json({success:true,message:"Booking created successfully"})
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
 

export const getUserBookings = async(req,res)=>{
  try{
    const user=req.user._id;
    const bookings= await bookingModel.find({user}).populate("room hall").sort({createdAt: -1})
    res.json({success:true,bookings})
  }catch(error){
    res.json({success:false, message: "Failed to fetch bookings"})
  }
}


export const getHallBookings = async (req, res) => {
  try {
    const hall = await hallModel.findOne({ owner: req.user._id }); // fixed here
    if (!hall) {
      return res.json({ success: false, message: "No Hall Found" });
    }

    const bookings = await bookingModel
      .find({ hall: hall._id })
      .populate("room hall user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};





