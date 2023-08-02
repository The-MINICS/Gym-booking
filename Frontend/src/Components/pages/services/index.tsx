import HomePageText from "@/assets/HomePageText.png";
import { motion } from "framer-motion";
import HomePageGraphic from "@/assets/HomePageGraphic4.png"
import equipment from "@/assets/equipments.png";
import RecreationRoom from "@/assets/Recreation-room.png";
import WorkoutPrograms from "@/assets/workout-program.png";
import BookIcon from "@/assets/booking.png";
import { Link } from "react-router-dom";
import HText from "@/shared/HText";

function Services(){
    
    return (
    <div className="w-full bg-gray-50">
        <div
            className="gap-16 bg-white pt-5 md:h-full md:pb-0 left-20">
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
                <div className="relative">
                    <div>
                    <img alt="home-page-text" src={HomePageText}/>
                    </div>
                </div>
                <p className="mt-4 text-sm">
                Welcome to The MINICS Gym.
                <li>The Place where you're gonna have a perfect body and sexy body,</li>
                <li>The Place where you're gonna be healthy,</li>
                <li>The Place where you're gonna be happy in everyday life.</li>
                </p>
                </motion.div>
            </div>
            </motion.div>
        </div>
        <motion.div className="mx-auto w-5/6 pt-10 pb-10">
            {/* Header */}
            <motion.div
                className="md:w-3/5"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
            >
                <HText>
                    <span className="text-red-500">OUR SERVICES</span> ALL WE GIVE WILLINGLY
                </HText>
                <p className="mt-3">
                    <li>All equipments that provide for you</li>
                    <li>All recreation room that make you happy</li>
                    <li>All the workout programs for anyone who don't has individual trainer</li>
                    <li>All the booking system that book easilly</li>
                </p>
            </motion.div>
            <motion.div
                    className="mt-16 basis-2/5 md:mt-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 },
                    }}>
                <ul>
                    <div className="my-10 bg-gray-100 pt-5 pb-5 px-0 rounded-xl">
                        <button className="curser-pointer ml-16 hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/equipments">
                                <img className="h-40 w-40" src={equipment} alt="equipment-icon"/>
                                <h3 className="text-xl font-bold text-black">Equipment</h3>
                            </Link>
                        </button>
                        <button className="curser-pointer ml-20 hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/recreations">
                                <img className="h-40 w-40" src={RecreationRoom} alt="recreation_room-icon"/>
                                <h3 className="text-xl font-bold text-black">Recreation Room</h3>
                            </Link>
                        </button>
                        <button className="curser-point ml-24 hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/programs">
                                <img className="h-40 w-40" src={WorkoutPrograms} alt="workout_room-icon"/>
                                <h3 className="text-xl font-bold text-black">Workout Programs</h3>
                            </Link>
                        </button>
                        <button className="curser-pointer ml-16 hover:bg-gray-200 rounded-xl py-3 px-3
                            active:scale-[.98] active:duration-85 transition-all">
                            <Link to="/bookings">
                                <img className="h-40 w-40" src={BookIcon} alt="booking-icon"/>
                                <h3 className="text-xl font-bold text-black">Booking</h3>
                            </Link>
                        </button>
                    </div>
                </ul>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Services;