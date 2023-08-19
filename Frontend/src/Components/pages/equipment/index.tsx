import { useState } from "react";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "react-feather";
import AllEquipment from "./equipment";
import HomeIcon from '@mui/icons-material/Home';

function Equipments(){
    const[ isExpanded, setIsExpanded ] = useState(false);
    const isChevronDown = isExpanded;
    const showChevronUp = !isExpanded;

    return (
    <section className="w-full">
        <motion.div className="mx-auto w-5/6 pt-10 pb-10 mt-5 justify-between bg-pink-50 rounded-2xl">
            {/* Header */}
            <motion.div
                className="md:w-3/5 mx-7"
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
                    <span className="text-red-500">ALL EQUIPMENTS in our gym:</span> WE PROUND TO PRESENT YOU
                </HText>
                <ul className="mt-5">
                    <li>🏋️‍♀️ Get Fit with Cutting-Edge Fitness Equipment!</li>
                    <li>🔥 Push Your Limits with State-of-the-Art Treadmills</li>
                    <li>🚴‍♀️ Ride to Success with High-Performance Stationary Bikes</li>
                    <li>💪 Build Strength and Sculpt Muscles with Weight Machines</li>
                    <li>🏋️‍♂️ Unleash Your Inner Beast with Free Weights</li>
                    <li>🧘‍♀️ Enhance Flexibility and Balance with Yoga Mats</li>
                    <li>🏋️‍♀️ Elevate Your Core with Medicine Balls</li>
                    <li>🕺 Unleash Your Creativity with Functional Trainers</li>
                    <li>🌟 Join us now and take the first step towards a healthier, fitter you!</li>
                </ul>
            </motion.div>
        </motion.div>

        <motion.div
            className="flex items-center justify-center my-5 gap-3"
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
                hidden: { opacity: 0, x:-50 },
                visible: { opacity: 1, x:-0 }
            }}
        >
            <button className="rounded-md bg-yellow-500 px-5 py-3 hover:bg-red-400
             hover:text-white active:scale-[.98] active:duration-75 transition-all">
                <Link to="/bookings" className="flex items-center justify-center gap-2">
                    <LaptopChromebookIcon/>
                    <p className="font-bold text-xl">Book Now</p>
                </Link>
            </button>
            <button className="rounded-md bg-red-300 px-5 py-3 hover:bg-yellow-500
             hover:text-white active:scale-[.98] active:duration-75 transition-all">
                <Link to="/services" className="flex items-center justify-center gap-2">
                    <HomeIcon/>
                    <p className="font-bold text-xl">All Our Services</p>
                </Link>
            </button>
        </motion.div>

        {/* Equipment page */}
        <div className="mx-auto md:w-4/5 my-2 px-3 py-2 rounded-lg mb-5 bg-orange-500">
            <button className="flex font-semibold text-2xl py-1 text-white 
                w-full text-left items-center justify-between px-5"
                onClick={()=> setIsExpanded(!isExpanded)}
            >
                Show All Our Equipment
                <div className="ml-2">
                    {isChevronDown && <ChevronDown size={42}/>}
                    {showChevronUp && <ChevronUp size={42}/>}
                </div>
            </button>
            {isExpanded && <AllEquipment/>}
        </div>
    </section>
  )
}

export default Equipments;