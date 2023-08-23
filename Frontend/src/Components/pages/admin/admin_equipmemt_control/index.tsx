import EquipmentIcon1 from "@/assets/exercise.png";
import EquipmentIcon2 from "@/assets/stationary-bicycle.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { ChevronDown, ChevronUp } from "react-feather";
import PicturEquipment from "./picture_control";
import AllEquipment from "./equipment_control";
import PictureEquipmentCreate from "./pic_eqi_create";

function EquipmentManagement() {
    const [showPictureCreate, setShowPictureCreate] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [Expanded, setExpanded] = useState(true);
    const isChevronDown = isExpanded;
    const showChevronUp = !isExpanded;
    const isDropDown = Expanded;
    const showUpper = !Expanded;

    const handleOnClose = () => {
        setShowPictureCreate(false);
    }
    
    return(
        <section className="w-full bg-gray-50 py-10">
            <motion.div className="mx-auto w-5/6">
            {/* Header */}
                    <motion.div
                        className="mx-20"
                        initial="hidden" 
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x:-50 },
                            visible: { opacity: 1, x:-0 }
                        }}
                    >
                        <div className="flex items-center justify-center gap-2 py-3 my-3">
                            <img src={EquipmentIcon1} className="h-16 w-16"/>
                            <h1 className="text-red-500 font-bold text-6xl">Equipment Management</h1>
                            <img src={EquipmentIcon2} className="h-16 w-16"/>
                        </div>
                    </motion.div>
            </motion.div>

            {/* Tool Option */}
            <motion.div
                className="flex items-center justify-center mb-5 gap-3"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
            >
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-red-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all">
                    <Link to="/" className="flex items-center justify-center gap-2">
                        <HomeIcon/>
                        <p className="font-bold text-xl">Home</p>
                    </Link>
                </button>
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-orange-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all"
                    onClick={() => setShowPictureCreate(true)}
                >
                    <div className="flex items-center justify-center gap-2">
                        <GroupAddIcon/>
                        <p className="font-bold text-xl">Add Equipment</p>
                    </div>
                </button>
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-purple-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all">
                    <Link to="/admin-tools" className="flex items-center justify-center gap-2">
                        <BuildIcon/>
                        <p className="font-bold text-xl">Administrator Tools</p>
                    </Link>
                </button>
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-green-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all">
                    <Link to="/equipments" className="flex items-center justify-center gap-2">
                        <PhoneIphoneIcon/>
                        <p className="font-bold text-xl">View Page</p>
                    </Link>
                </button>
            </motion.div>

            {/* Show Equipment */}
            <div className="mx-auto md:w-4/5 mt-2 py-2 rounded-lg mb-5 bg-green-50">
                <button className="flex font-semibold text-2xl py-1 text-green-700 
                    w-full text-left items-center justify-between px-2"
                    onClick={()=> setIsExpanded(!isExpanded)}
                >
                    All Our Equipment
                    <div className="ml-2">
                        {isChevronDown && <ChevronDown size={42}/>}
                        {showChevronUp && <ChevronUp size={42}/>}
                    </div>
                </button>
                {isExpanded && <PicturEquipment/>}
            </div>

            {/* All Equipments List */}
            <div className="mx-auto md:w-4/5 px-3 py-2 rounded mb-5 bg-gray-50">
                <button className="flex font-semibold text-2xl py-1 text-red-700 
                    w-full text-left items-center justify-between px-2"
                    onClick={()=> setExpanded(!Expanded)}
                >
                    List Of All Our Available Equipment
                    <div className="ml-2">
                        {isDropDown && <ChevronDown size={42}/>}
                        {showUpper && <ChevronUp size={42}/>}
                    </div>
                </button>
                {Expanded && <AllEquipment/>}
            </div>

            {/* Add Equipment (Page 1/2) */}
            <PictureEquipmentCreate onClose={handleOnClose} Visible={showPictureCreate}/>
        </section>
    )
}
export default EquipmentManagement;