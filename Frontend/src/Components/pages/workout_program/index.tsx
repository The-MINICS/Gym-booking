import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { ChevronDown, ChevronUp } from "react-feather";
import { useState } from "react";
import WorkoutBeginner1 from "./workout-beginner1";
import WorkoutBeginner2 from "./workout-beginner2";
import WorkoutBeginner3 from "./workout-beginner3";

function WorkoutPrograms(){
    const[ isExpanded1, setIsExpanded1 ] = useState(false);
    const[ isExpanded2, setIsExpanded2 ] = useState(false);
    const[ isExpanded3, setIsExpanded3 ] = useState(false);

    const isChevronDown1 = isExpanded1;
    const showChevronUp1 = !isExpanded1;
    const isChevronDown2 = isExpanded2;
    const showChevronUp2 = !isExpanded2;
    const isChevronDown3 = isExpanded3;
    const showChevronUp3 = !isExpanded3;

    return (
    <div className="w-full">
        <motion.div className="mx-auto w-5/6 pt-10 pb-5 ml-16">
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
                    <span className="text-red-500">WORKOUT PROGRAM</span> Get Fit, Get Strong, Get Started! 🏋️‍♀️🏋️‍♂️
                </HText>
                <p className="my-5">
                Are you ready to take your fitness journey to the next level? Look no further! Join our state-of-the-art fitness gym
                and unlock your true potential with our personalized workout programs designed to help you achieve your fitness goals!
                </p>
                
            </motion.div>
        </motion.div>
        {/* Header program*/}
        <div className="bg-gray-50 mx-16 my-2 py-3 px-3 text-center text-blue-800 rounded-lg">
            <HText>BIGINNER WORKOUT</HText>
        </div>
        {/* workout beginner phase 1*/}
        <div className="bg-gray-50 mx-16 my-2 pl-3 py-2 rounded-lg">
            <button className="flex font-semibold text-2xl py-2 text-pink-700 
                w-full text-left items-center justify-between px-5"
                onClick={()=> setIsExpanded1(!isExpanded1)}
            >
                THE BEST 15-MINUTE WARM-UPS
                <div className="ml-2">
                    {isChevronDown1 && <ChevronDown size={42}/>}
                    {showChevronUp1 && <ChevronUp size={42}/>}
                </div>
            </button>
            {isExpanded1 && <WorkoutBeginner1/>}
        </div>
        {/* workout beginner phase 2*/}
        <div className="bg-gray-50 mx-16 my-2 pl-3 py-2 rounded-lg">
            <button className="flex font-semibold text-2xl py-2 text-pink-700 
                w-full text-left items-center justify-between px-5"
                onClick={()=> setIsExpanded2(!isExpanded2)}
            >
                HOW TO GAIN MASS FAST: 20 WEEK QUICK START PROGRAM
                <div className="ml-2">
                    {isChevronDown2 && <ChevronDown size={42}/>}
                    {showChevronUp2 && <ChevronUp size={42}/>}
                </div>
            </button>
            {isExpanded2 && <WorkoutBeginner2/>}
        </div>
        {/* workout beginner phase 3*/}
        <div className="bg-gray-50 mx-16 mt-2 mb-10 pl-3 py-2 rounded-lg">
            <button className="flex font-semibold text-2xl py-2 text-pink-700 
                w-full text-left items-center justify-between px-5"
                onClick={()=> setIsExpanded3(!isExpanded3)}
            >
                5 DAY HOME WORKOUT ROUTINE WITH MINIMAL EQUIPMENT
                <div className="ml-2">
                    {isChevronDown3 && <ChevronDown size={42}/>}
                    {showChevronUp3 && <ChevronUp size={42}/>}
                </div>
            </button>
            {isExpanded3 && <WorkoutBeginner3/>}
        </div>
    </div>
  )
}

export default WorkoutPrograms;