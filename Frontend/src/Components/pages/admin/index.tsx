import HomePageText from "@/assets/HomePageText.png";
import { motion } from "framer-motion";
import HomePageGraphic from "@/assets/HomePageGraphic3.png"
import { Link } from "react-router-dom";
import equipment from "@/assets/equipments.png";
import RecreationRoom from "@/assets/Recreation-room.png";
import MemberShip from "@/assets/membership.png";
import BookIcon from "@/assets/booking.png";
import Complaint from "@/assets/complaint.png";
import BookingSchedule from "@/assets/BookingSchedule.png";
import HText from "@/shared/HText";
import BuildIcon from '@mui/icons-material/Build';

function AdminTools(){
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
      <div className="z-10 mt-32 md:basis-3/5">
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
            <div className="before:absolute before:-top-24 before:-left-72
              before:z-[-1] md:before:content-evolvetext">
              <img alt="home-page-text" src={HomePageText}/>
            </div>
          </div>
            <HText>
                <span className="mt-5 font-bold text-4xl text-red-600 flex items-center justify-center">
                    <BuildIcon/> ADMINISTRATOR TOOLS <BuildIcon/>
                </span>
            </HText>

        </motion.div>

        {/* QuickMenu */}
          <motion.div
                    className="mt-5 basis-2/5 md:mt-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 },
                    }}>
                <ul>
                    <div className="px-3 py-3 my-2 mx-auto bg-gray-100 rounded-2xl">
                        <div className="flex items-center justify-center gap-20 py-3">
                            <button className="curser-pointer hover:bg-gray-200 rounded-xl py-3 px-3
                                active:scale-[.98] active:duration-85 transition-all text-center h-auto w-40">
                                <Link to="/equipment-manage">
                                    <img className="h-32 w-32" src={equipment} alt="equipment-icon"/>
                                    <h3 className="text-lg font-bold text-black">Equipment Management</h3>
                                </Link>
                            </button>
                            <button className="curser-pointer hover:bg-gray-200 rounded-xl py-3 px-3
                                active:scale-[.98] active:duration-85 transition-all text-center h-auto w-40">
                                <Link to="/class-mannage">
                                    <img className="h-32 w-32" src={RecreationRoom} alt="recreation_room-icon"/>
                                    <h3 className="text-lg font-bold text-black">Class Management</h3>
                                </Link>
                            </button>
                            <button className="curser-point hover:bg-gray-200 rounded-xl py-3 px-3
                                active:scale-[.98] active:duration-85 transition-all text-center h-auto w-40">
                                <Link to="/member-manage">
                                    <img className="h-auto w-32" src={MemberShip} alt="workout_room-icon"/>
                                    <h3 className="text-lg font-bold text-black">Member Management</h3>
                                </Link>
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-20 py-3">
                            <button className="curser-pointer hover:bg-gray-200 rounded-xl py-3 px-3
                                active:scale-[.98] active:duration-85 transition-all text-center h-auto w-40">
                                <Link to="/bookings">
                                    <img className="h-32 w-32" src={BookIcon} alt="booking-icon"/>
                                    <h3 className="text-lg font-bold text-black">Booking</h3>
                                </Link>
                            </button>
                            <button className="curser-pointer hover:bg-gray-200 rounded-xl py-3 px-3
                                active:scale-[.98] active:duration-85 transition-all text-center h-auto w-40">
                                <Link to="/bookingsch">
                                    <img className="h-32 w-32 ml-4" src={BookingSchedule} alt="booking-icon"/>
                                    <h3 className="text-lg font-bold text-black">Booking Schedule</h3>
                                </Link>
                            </button>
                            <button className="curser-pointer hover:bg-gray-200 rounded-xl py-3 px-3
                                active:scale-[.98] active:duration-85 transition-all text-center h-auto w-40">
                                <Link to="/complaint-handle">
                                    <img className="h-32 w-32 mx-2" src={Complaint} alt="booking-icon"/>
                                    <h3 className="text-lg font-bold text-black">Complaint Handling</h3>
                                </Link>
                            </button>
                        </div>
                    </div>
                </ul>
            </motion.div>
        </div>
    </motion.div>
  </div>
  )
}

export default AdminTools;