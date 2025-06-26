import heroBanner from './bg-hero.jpeg';
import hall from './hall.jpeg';
import donation from './donation.jpg';
import ladies from './ladies.jpg';
import priest from './priest.jpg';
import accomodation from './accormodation.jpg';
import person_icon from './person_icon.svg';
import mail_icon from './mail_icon.svg';
import lock_icon from './lock_icon.svg';
import room1Image from './delux.jpg';
import room2Image from './acroom.jpg';
import room3Image from './dormitory.jpg';
import room4Image from './guest.jpg';

import {
  FaWifi,
  FaTv,
  FaShower,
  FaFan,
  FaLock,
  FaWater,
  FaBed,
  FaBath,
} from 'react-icons/fa';
import { MdOutlineBathroom, MdLocalDrink } from 'react-icons/md';


import {
  FaHandsHelping,
  FaGopuram,
  FaBookReader,
  FaPrayingHands,
  FaHeart,
  FaHandshake,
  FaLeaf,
  FaGraduationCap,
  FaOm,

} from "react-icons/fa";

export const images = {
  heroBanner,
  hall,
  donation,
  ladies,
  priest,
  accomodation,
  person_icon,
  lock_icon,
  mail_icon,
};

export const features = [
  {
    feature: "Community Hall Booking",
    example: "A family books a hall for a wedding",
    image: hall,
  },
  {
    feature: "Priest Service",
    example: "A user books a priest for a Satyanarayan Puja",
    image: priest,
  },
  {
    feature: "Ladies Group Activities",
    example: "Members view a Garba event and register",
    image: ladies,
  },
  {
    feature: "Accommodation",
    example: "A guest reserves a room during a wedding",
    image: accomodation,
  },
  {
    feature: "Donation Page",
    example: "Donors support an education fund online",
    image: donation,
  },
];

export const missionCards = [
  {
    title: "Unity & Fellowship",
    icon: FaHandsHelping,
    description:
      "Bringing Gujarati Brahmins together through social gatherings, festivals, and community events.",
  },
  {
    title: "Cultural Heritage",
    icon: FaGopuram,
    description:
      "Celebrating our traditions, language, and festivals that define our roots and identity.",
  },
  {
    title: "Education & Knowledge",
    icon: FaBookReader,
    description:
      "Promoting learning, excellence, and student support through cultural and academic programs.",
  },
  {
    title: "Spiritual Growth",
    icon: FaPrayingHands,
    description:
      "Nurturing faith and values through religious events, satsangs, and spiritual discourse.",
  },
  {
    title: "Community Welfare",
    icon: FaHeart,
    description:
      "Contributing to society through seva, support programs, and charitable activities.",
  },
];

export const missionGujarati = [
  { icon: FaHandshake, text: "સમાજમાં એકતા અને સહયોગ વધારવો" },
  { icon: FaLeaf, text: "ગુજરાતી સંસ્કૃતિ અને પરંપરાનું સંવર્ધન" },
  { icon: FaGraduationCap, text: "યુવાનો અને વિદ્યાર્થીઓ માટે શિક્ષણમાં સહાયતા" },
  { icon: FaOm, text: "આધ્યાત્મિક અને ધાર્મિક પ્રવૃત્તિઓનું આયોજન" },
  { icon: FaHandsHelping, text: "સામાજિક સેવા અને દાન પ્રવૃત્તિઓમાં સહભાગી થવું" },
];

export const roomAmenityIcons = {
  "Wi-Fi": FaWifi,
  "TV": FaTv,
  "Hot Water": FaShower,
  "Fan": FaFan,
  "Lockers": FaLock,
  "24x7 Water": FaWater,
  "Water": FaWater,
  "Drinking Water": MdLocalDrink,
  "Bed": FaBed,
  "Attached Bathroom": FaBath,
  "Shared Bathroom": MdOutlineBathroom,
  "Clean Linens": FaBed,
  "AC": FaFan,
};
export const rooms = [
  {
    _id: "room1",
    name: "Deluxe Room",
    description:
      "Our Deluxe Room is designed to provide comfort and relaxation, featuring a spacious layout ideal for families. Enjoy a well-furnished interior with an attached private bathroom, modern fixtures, and elegant decor. Whether you're staying for a short trip or an extended vacation, this room provides the perfect balance of luxury and homely comfort.",
    price: 1500,
    capacity: 3,
    images: [room1Image, room2Image, room3Image],
    rating: 4.5,
    hostedBy: "Jay Patel",
    contactNumber: "9876543210",
    amenities: ["Attached Bathroom", "Fan", "Wi-Fi", "24x7 Water"],
  },
  {
    _id: "room2",
    name: "AC Room",
    description:
      "The Air-Conditioned Room offers a refreshing escape from the heat, making it a perfect choice for travelers looking for comfort and tranquility. Equipped with a split AC, flat-screen TV, and high-speed Wi-Fi, this room ensures you stay connected and relaxed. Suitable for couples or solo guests seeking a premium experience without compromise.",
    price: 2000,
    capacity: 2,
    images: [room2Image, room1Image, room4Image],
    rating: 4.8,
    hostedBy: "Kiran Shah",
    contactNumber: "9765432180",
    amenities: ["AC", "Wi-Fi", "TV", "Hot Water"],
  },
  {
    _id: "room3",
    name: "Dormitory",
    description:
      "The Dormitory is a cost-effective and social accommodation option, best suited for students, group travelers, or pilgrims. With comfortable bunk beds, shared bathroom facilities, and secure storage lockers, it offers a safe and friendly environment for budget-conscious guests. Designed to accommodate up to 8 people, this space fosters a community-like experience.",
    price: 500,
    capacity: 8,
    images: [room3Image, room4Image, room1Image],
    rating: 4.2,
    hostedBy: "Ramesh Bhatt",
    contactNumber: "9988776655",
    amenities: ["Shared Bathroom", "Fans", "Drinking Water", "Lockers"],
  },
  {
    _id: "room4",
    name: "Guest Room",
    description:
      "Our Guest Room offers a serene atmosphere ideal for visiting priests, elders, or special guests. With a focus on cleanliness, comfort, and simplicity, it includes all essential amenities such as fresh linens, drinking water, and a well-ventilated layout. This room is designed to provide peace and privacy for a restful stay.",
    price: 1200,
    capacity: 2,
    images: [room4Image, room1Image, room2Image],
    rating: 4.3,
    hostedBy: "Meera Joshi",
    contactNumber: "9123456789",
    amenities: ["Bed", "Fan", "Water", "Clean Linens"],
  },
];



