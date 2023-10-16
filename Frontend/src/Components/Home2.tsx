import HomePageText from "@/assets/HomePageText.png";
import { motion } from "framer-motion";
import HomePageGraphic from "@/assets/HomePageGraphic6.png"
import { Link } from "react-router-dom";
import equipment from "@/assets/equipments.png";
import RecreationRoom from "@/assets/Recreation-room.png";
import BookIcon from "@/assets/siblings.png";
import EquipmentBookIcon from "@/assets/booking.png";
import ContactUs from "@/assets/ContactUs.png";
import BookingSchedule from "@/assets/BookingSchedule.png";

function Home(){
  return (
  <div
    className="gap-16 bg-gray-50 pt-36 md:h-full md:pb-0 left-16">
    {/* Image and main header */}
    <motion.div 
      className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6">
      {/* IMAGE */}
      <div
          className="flex justify-center basis-2/5"
        >
          <img alt="home-pageGraphic" src={HomePageGraphic} />
      </div>
      {/* Main Header */}
      <div className="z-10 md:basis-3/5">
        {/* Headings */}
        <motion.div 
          className="md:-mt-20" 
          initial="hidden" 
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x:-50 },
            visible: { opacity: 1, x:-0 }
          }}>
          <div className="relative -ml-5">
              <img alt="home-page-text" src={HomePageText}/>
          </div>
          <p className="mt-4 text-sm font-medium">
            <p className="font-bold text-lg">Welcome to The MINICS Gym.</p>
          <li>The Place where you're gonna have a perfect body and sexy body,</li>
          <li>The Place where you're gonna be healthy,</li>
          <li>The Place where you're gonna be happy in everyday life.</li>
          </p>
        </motion.div>

        {/* QuickMenu */}
          <motion.div
            className="basis-2/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
            hidden: { opacity: 0, x:-50 },
            visible: { opacity: 1, x:-0 },
              }}>
                <ul>
                    <div className="bg-gray-100 pt-2 pb-2 rounded-xl mt-4">
                        <button className="curser-pointer ml-14 items-center justify-center flex-auto hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/equipments">
                                <img className="h-32 w-32" src={equipment} alt="equipment-icon"/>
                                <h3 className="text-lg font-bold text-black">Equipment</h3>
                            </Link>
                        </button>
                        <button className="curser-pointer ml-20 items-center justify-center flex-auto hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/recreations">
                                <img className="h-32 w-32 ml-2" src={RecreationRoom} alt="recreation_room-icon"/>
                                <h3 className="text-lg font-bold text-black">Recreation Room</h3>
                            </Link>
                        </button>
                        <button className="curser-pointer ml-20 items-center justify-center flex-auto hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/bookings">
                                <img className="h-32 w-32" src={BookIcon} alt="booking-icon"/>
                                <h3 className="text-lg font-bold text-black">Room Booking</h3>
                            </Link>
                        </button>
                        <button className="curser-pointer ml-14 items-center justify-center flex-auto hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/equipmentbooking-create">
                                <img className="h-32 w-32" src={EquipmentBookIcon} alt="EQbooking-icon"/>
                                <h3 className="text-lg font-bold text-black">Equipment Booking</h3>
                            </Link>
                        </button>
                        <button className="curser-pointer ml-14 items-center justify-center flex-auto hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/bookingsch">
                                <img className="h-32 w-32 ml-4" src={BookingSchedule} alt="booking-icon"/>
                                <h3 className="text-lg font-bold text-black">Booking Schedule</h3>
                            </Link>
                        </button>
                        <button className="curser-pointer ml-14 items-center justify-center flex-auto hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/contact-us">
                                <img className="h-32 w-32 mx-2" src={ContactUs} alt="booking-icon"/>
                                <h3 className="text-lg font-bold text-black">Contact Us</h3>
                            </Link>
                        </button>
                    </div>
                </ul>
            </motion.div>
        </div>
    </motion.div>
  </div>
  )
}

export default Home;