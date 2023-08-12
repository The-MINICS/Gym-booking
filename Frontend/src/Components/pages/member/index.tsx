import HomePageText from "@/assets/HomePageText.png";
import { motion } from "framer-motion";
import HomePageGraphic from "@/assets/BenefitPageGraphic.png";
import ResetPasswordIcon from "@/assets/reset-password.png";
import BookingSchedule from "@/assets/BookingSchedule.png";
import WorkoutPrograms from "@/assets/workout-program.png";
import AcountIcon from "@/assets/Usericon.png";
import { Link } from "react-router-dom";
import HText from "@/shared/HText";
import MemberPageGraphic from "@/assets/MemberPageGraphic.jpg";
import MemberPageGraphic2 from "@/assets/MemberPageGraphic2.jpg";

function Member(){
    
    return (
        <div className="w-full bg-gray-50">
            {/* HomePage */}
            <motion.div className="gap-16 bg-pink-50 pt-5 md:h-full md:pb-0 left-20">
                {/* Image and main header */}
                <motion.div 
                    className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6">
                        {/* Main Header */}
                        <div className="z-10 mt-10 md:basis-3/5">
                            {/* Headings */}
                            <motion.div 
                            className="md:mt-0" 
                            initial="hidden" 
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            variants={{
                                hidden: { opacity: 0, x:-50 },
                                visible: { opacity: 1, x:-0 }
                            }}>
                            <div className="relative">
                                <div className="before:absolute before:-top-20 before:-left-20 
                                    before:z-[-1] md:before:content-evolvetext">
                                <img alt="home-page-text" src={HomePageText}/>
                                </div>
                            </div>
                            <h1 className="mt-4 text-red-600 font-monserrat text-3xl font-bold">
                                🏋️ Join Our Fitness Gym and Unlock Your True Potential! 🏋️
                            </h1>
                            <ul>
                                <li>Are you ready to transform your body and take your fitness journey to the next level?</li>
                                <li>Look no further! Our state-of-the-art fitness gym is the ultimate destination for anyone</li>
                                <li>who is passionate about health, wellness, and achieving their fitness goals</li>
                            </ul>
                            </motion.div>
                        </div>
                        {/* IMAGE */}
                        <div
                            className="flex justify-center basis-2/5"
                            >
                            <img alt="home-pageGraphic" src={HomePageGraphic} />
                        </div>
                    
                </motion.div>
            </motion.div>

            {/* Page Graphic */}
            <motion.div className="mx-auto w-5/6 pt-10 pb-10">
                <div className="justify-between gap-8 md:flex">
                    <motion.div
                        className="mt-4 basis-2/5"
                        initial="visible" 
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            visible: { opacity: 1, x:-0 }
                        }}>
                        <img
                            className="rounded-lg bg-auto w-full"
                            alt="our-services-page-graphic"
                            src={MemberPageGraphic}
                        />
                        <img
                            className="rounded-lg bg-auto w-full mt-5"
                            alt="our-services-page-graphic"
                            src={MemberPageGraphic2}
                        />
                    </motion.div>
                {/* Header */}
            <div className="relative">
                <div className="">
                    <motion.div
                            initial="visible" 
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            variants={{
                                visible: { opacity: 1, x:-0 }
                            }}>
                            <HText>
                                <span className="text-red-500">BEING MEMBERSHIP</span> BEING FITNESS HOME
                            </HText>
                            <h1 className="text-blue-500 font-bold text-xl">🔥 Here's why you should become a member of our fitness gym 🔥</h1>
                            <p className="mt-1">
                                <li className="font-bold text-base">Expert Guidance:</li> Our team of certified fitness trainers are dedicated to helping you succeed. 
                                Whether you're a beginner or a seasoned fitness enthusiast, they will design personalized workout plans tailored to your individual needs and goals.
                                <li className="font-bold text-base">Top-notch Facilities:</li> Our gym is equipped with the latest and most advanced fitness equipment. 
                                From cardio machines to strength training gear, you'll have everything you need to challenge yourself and achieve remarkable results.
                                <li className="font-bold text-base">Wide Range of Classes:</li> We offer a diverse range of fitness classes to keep your workouts exciting and dynamic. 
                                From high-intensity interval training (HIIT) to yoga and dance classes, there's something for everyone to enjoy.
                                <li className="font-bold text-base">Supportive Community:</li> Join a welcoming and supportive community of like-minded individuals 
                                who will motivate and inspire you on your fitness journey. Make friends, share experiences, and celebrate achievements together!
                                <li className="font-bold text-base">Flexible Memberships:</li> We understand that everyone's fitness needs are different, 
                                which is why we offer flexible membership plans to suit your schedule and budget. Choose from various options to find the perfect fit for you.
                                <li className="font-bold text-base">Flexible Memberships:</li> We offer various membership options to fit your lifestyle and budget. 
                                Whether you want short-term access or long-term commitment, we have the perfect plan for you.
                                <li className="font-bold text-base">Fun Challenges and Events:</li> Stay motivated with our exciting challenges and events that add an element of fun 
                                and competition to your fitness routine. Win rewards and prizes while pushing your limits!
                                <p>
                                    Don't wait any longer to become the best version of yourself. Join our fitness gym today and start your journey towards a healthier, stronger, 
                                and happier you! Sign up now or call us at [Your Gym's Contact Number] for more information.
                                </p>
                                <p>
                                    Remember, it's never too late to start, and we're here to support you every step of the way. Together, let's make your fitness goals a reality! 🎉
                                </p>
                            </p>
                    </motion.div>
                </div>
            </div>
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
                                visible: { opacity: 1, x:-0 }
                            }}>
                        <ul>
                            <div className="my-10 bg-gray-100 pt-5 pb-5 px-0 rounded-xl">
                                <button className="curser-pointer ml-16 hover:bg-gray-200 rounded-xl py-3 px-3
                                    active:scale-[.98] active:duration-85 transition-all">
                                    <Link to="/profile">
                                        <img className="h-40 w-40" src={AcountIcon} alt="equipment-icon"/>
                                        <h3 className="text-xl font-bold text-black">My Account</h3>
                                    </Link>
                                </button>
                                <button className="curser-pointer ml-20 hover:bg-gray-200 rounded-xl py-3 px-3
                                    active:scale-[.98] active:duration-85 transition-all">
                                    <Link to="/bookingsch">
                                        <img className="h-40 w-40 ml-2" src={BookingSchedule} alt="recreation_room-icon"/>
                                        <h3 className="text-xl font-bold text-black">Booking Schedule</h3>
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
                                    <Link to="/chpassword">
                                        <img className="h-40 w-40 ml-6" src={ResetPasswordIcon} alt="booking-icon"/>
                                        <h3 className="text-xl font-bold text-black">Change My Password</h3>
                                    </Link>
                                </button>
                            </div>
                        </ul>
                    </motion.div>
            </motion.div>
        </div>
        )
}

export default Member;