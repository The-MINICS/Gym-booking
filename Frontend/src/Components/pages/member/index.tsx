import { motion } from "framer-motion";
import BookingSchedule from "@/assets/BookingSchedule.png";
import AcountIcon from "@/assets/Usericon.png";
import AcountSettingsIcon from "@/assets/account-settings.png"
import { Link } from "react-router-dom";
import HText from "@/shared/HText";
import MemberPageGraphic from "@/assets/MemberPageGraphic.jpg";
import MemberPageGraphic2 from "@/assets/MemberPageGraphic2.jpg";
import ContactUs from "@/assets/ContactUs.png";

function Member(){
    return (
        <div className="w-full bg-gray-50">
        {/* Page Graphic */}
            <motion.div className="mx-auto w-5/6 py-10">
                <div className="justify-between md:flex">
                    <motion.div
                        className="basis-2/5"
                        initial="hidden" 
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            visible: { opacity: 1, x:-0 },
                            hidden: { opacity: 0, x:-50 },
                        }}>
                        <img
                            className="rounded-lg w-4/5 h-auto mb-5 mx-7 mt-1"
                            alt="our-services-page-graphic"
                            src={MemberPageGraphic}
                        />
                        <img
                            className="rounded-lg w-4/5 h-auto mx-7"
                            alt="our-services-page-graphic"
                            src={MemberPageGraphic2}
                        />
                    </motion.div>
                {/* Header */}
                <div className="relative">
                    <motion.div
                            initial="hidden" 
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            variants={{
                                visible: { opacity: 1, x:-0 },
                                hidden: { opacity: 0, x:-50 },
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
                            </p>
                    </motion.div>
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
                            <div className="my-5 bg-gray-100 py-5 px-20 rounded-xl flex items-center justify-between">
                                <button className="curser-pointer hover:bg-gray-200 rounded-xl p-3
                                    active:scale-[.98] active:duration-85 transition-all">
                                    <Link to="/profile">
                                        <img className="h-36 w-36" src={AcountIcon} alt="equipment-icon"/>
                                        <h3 className="text-xl font-bold text-black">My Account</h3>
                                    </Link>
                                </button>
                                <button className="curser-pointer hover:bg-gray-200 rounded-xl p-3
                                    active:scale-[.98] active:duration-85 transition-all">
                                    <Link to="/bookingsch">
                                        <img className="h-36 w-36" src={BookingSchedule} alt="recreation_room-icon"/>
                                        <h3 className="text-xl font-bold text-black">Booking Schedule</h3>
                                    </Link>
                                </button>
                                <button className="curser-pointer hover:bg-gray-200 rounded-xl p-3
                                    active:scale-[.98] active:duration-85 transition-all">
                                    <Link to="/account-setting">
                                        <img className="h-36 w-36" src={AcountSettingsIcon} alt="equipment-icon"/>
                                        <h3 className="text-xl font-bold text-black">Account Settings</h3>
                                    </Link>
                                </button>
                                <button className="curser-pointer hover:bg-gray-200 rounded-xl p-3
                                    active:scale-[.98] active:duration-85 transition-all">
                                    <Link to="/contact-us">
                                        <img className="h-36 w-36" src={ContactUs} alt="equipment-icon"/>
                                        <h3 className="text-xl font-bold text-black">Contact Us</h3>
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