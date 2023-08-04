import HomePageText from "@/assets/HomePageText.png";
import { motion } from "framer-motion";
import HomePageGraphic from "@/assets/HomePageGraphic4.png"
import equipment from "@/assets/equipments.png";
import RecreationRoom from "@/assets/Recreation-room.png";
import WorkoutPrograms from "@/assets/workout-program.png";
import BookIcon from "@/assets/booking.png";
import { Link } from "react-router-dom";
import HText from "@/shared/HText";
import OurServicesPageGraphic from "@/assets/OurServicesPageGraphic.jpg";

function Services(){
    
    return (
    <div className="w-full bg-gray-50">
        {/* HomePage */}
        <motion.div className="gap-16 bg-white pt-5 md:h-full md:pb-0 left-20">
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
                    <div className="before:absolute before:-top-24 before:-left-72
                    before:z-[-1] md:before:content-evolvetext">
                    <img alt="home-page-text" src={HomePageText}/>
                    </div>
                </div>
                <h1 className="mt-4 text-red-600 font-monserrat text-3xl font-bold">
                    Welcome to Our Services.
                </h1>
                <ul>
                    <li>🏋️‍♀️ Get Fit and Feel Great at Our Fitness Gym! 🏋️‍♂️</li>
                    <li>🌟 Join us now and take the first step towards a healthier, fitter you! 🌟</li>
                    <li>🔥 Why Choose Our Fitness Gym? 🔥</li>
                </ul>
                </motion.div>
            </div>
            </motion.div>
        </motion.div>

        {/* Our Services page */}
        <motion.div className="mx-auto w-5/6 pt-10 pb-10">
            <div className="justify-between gap-8 md:flex">
            {/* Header */}
                <motion.div
                    className="basis-3/5 md:mt-0"
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
                    <h1 className="text-purple-500 font-bold text-xl">🔥 Why Choose Our Fitness Gym? 🔥</h1>
                    <p className="mt-1">
                        <li className="font-bold text-base">Expert Trainers:</li> Our certified and experienced trainers are passionate about helping you succeed. 
                        They will design personalized workout plans and provide ongoing support to keep you motivated.
                        <li className="font-bold text-base">Cutting-Edge Equipment:</li> We have a wide range of top-of-the-line equipment, 
                        catering to all fitness levels. From cardio machines to strength training equipment, we've got you covered.
                        <li className="font-bold text-base">Group Classes:</li> Join our high-energy group classes led by enthusiastic instructors. 
                        Choose from Zumba, Yoga, HIIT, and more. It's a fun way to stay motivated while making friends!
                        <li className="font-bold text-base">Nutritional Guidance:</li> Fitness isn't just about exercise; it's also about nutrition. 
                        Our experts will guide you on making healthy choices to fuel your body for optimal performance.
                        <li className="font-bold text-base">Clean and Safe Environment:</li> Your health and safety are our top priorities. 
                        Our gym is meticulously cleaned and sanitized regularly to ensure a hygienic workout space.
                        <li className="font-bold text-base">Flexible Memberships:</li> We offer various membership options to fit your lifestyle and budget. 
                        Whether you want short-term access or long-term commitment, we have the perfect plan for you.
                        <li className="font-bold text-base">Inclusive Community:</li> Our gym is a welcoming and inclusive space for everyone. No matter your age, 
                        fitness level, or background, you'll find a supportive community here.
                    </p>
                </motion.div>
                {/* ContactPageGraphic */}
                <motion.div
                    className="mt-16 basis-2/5 md:mt-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x:-50 },
                        visible: { opacity: 1, x:-0 },
                    }}>
                    <div className="relative">
                        <div>
                            <img
                                className="rounded-lg bg-auto w-full"
                                alt="our-services-page-graphic"
                                src={OurServicesPageGraphic}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* QuickMenu */}
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
                                    <img className="h-40 w-40 ml-2" src={RecreationRoom} alt="recreation_room-icon"/>
                                    <h3 className="text-xl font-bold text-black">Recreation Room</h3>
                                </Link>
                            </button>
                            <button className="curser-point ml-24 hover:bg-gray-200 rounded-xl py-3 px-3
                                active:scale-[.98] active:duration-85 transition-all">
                                <Link to="/programs">
                                    <img className="h-40 w-40 ml-2" src={WorkoutPrograms} alt="workout_room-icon"/>
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