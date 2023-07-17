import { BenefitType, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { Benefit } from "./Benefit";
import ActionButton from "@/shared/ActionButton";
import BenefitPageGraphic from "@/assets/BenefitPageGraphic.png"
import { 
    HomeModernIcon, 
    UserGroupIcon, 
    AcademicCapIcon 
} from "@heroicons/react/24/solid"
import img1 from "@/assets/fitness_room1.jpg";
import img2 from "@/assets/fitness_room2.jpg";
import img3 from "@/assets/fitness_room3.jpg";
import Carousel from "./carousel_benefits";

const benefits: Array<BenefitType> = [
    {
        icon: <HomeModernIcon className="h-6 w-6" />,
        title: "state-of-the-art fitness gym",
        description:
            "Technologically Advanced Equipment: APC invests in the latest fitness equipment and technology to provide its members with the best training experience. They have high-quality cardio machines, strength training equipment, interactive workout systems, and advanced tracking devices to monitor progress."
    },
    {
        icon: <UserGroupIcon className="h-6 w-6" />,
        title: "state-of-the-art fitness gym",
        description:
            "Virtual Reality (VR) Training: APC incorporates virtual reality technology into their training programs. VR training allows users to immerse themselves in simulated environments and participate in interactive workout experiences, making workouts more engaging and enjoyable."
    },
    {
        icon: <AcademicCapIcon className="h-6 w-6" />,
        title: "state-of-the-art fitness gym",
        description:
            "Personalized Training Programs: APC offers personalized training programs tailored to individual goals and fitness levels. They have certified trainers and fitness experts who provide one-on-one coaching, perform fitness assessments, and design customized workout plans to maximize results."
    },
]

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    }
}

const benefit_slides = [img1, img2, img3];

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Benefits = ({setSelectedPage}: Props) => {
  return <section id="benefits" className="mx-auto min-h-full w-5/6 py-20">
        <motion.div 
            onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}>
            {/* Header */}
            <motion.div 
                className="md:my-5 md:w-3/5"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x: 0 }
                }}
            >
                <HText>MORE THAN JUST GYM</HText>
                <p className="my-5 text-sm">
                    "Get ready to unleash your inner strength 
                    at our state-of-the-art fitness gym, 
                    where dedication meets results!"
                </p>
            </motion.div>
            {/* Benefits */}
            <motion.div 
                className="mt-5 items-center justify-between gap-8 md:flex"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={container}
                >
                {benefits.map(((benefit: BenefitType) => 
                    <Benefit
                        key={benefit.title}
                        icon={benefit.icon}
                        title={benefit.title}
                        description={benefit.description}
                        setSelectedPage={setSelectedPage}
                    />
                ))}
            </motion.div>
            {/* Graphics and description */}
            <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
                {/* Graphic */}
                <img
                    className="mx-auto"
                    alt="benefits-page-graphic"
                    src={BenefitPageGraphic}
                />
                {/* description */}
                <div>
                    {/* Title */}
                    <div className="relative">
                        <div>
                            <motion.div
                                initial="hidden" 
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0, x: 50 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                            >
                                <HText>
                                    MILLIONS OF HAPPY MEMBERS GETTING {" "}
                                    <span className="text-red-400">FIT</span>
                                </HText>
                            </motion.div>
                        </div>
                    </div>
                    {/* Descript */}
                    <motion.div
                        initial="hidden" 
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <p className="my-5">
                        Group Fitness Classes: APC organizes a variety of group fitness classes, ranging from high-intensity interval training (HIIT)
                        to yoga and Pilates. These classes are led by experienced instructors who motivate and guide participants through challenging workouts 
                        in a supportive environment.
                        </p>
                        <p className="mb-5">
                        Performance Tracking and Analysis: The gym utilizes advanced tracking systems and software to monitor members' progress and provide insightful analysis. 
                        This includes body composition analysis, heart rate monitoring, and performance metrics, allowing individuals to track their fitness goals 
                        and make data-driven adjustments to their routines.
                        </p>
                    </motion.div>
                    {/* Button */}
                    <ActionButton setSelectedPage={setSelectedPage}>
                        Join Now
                    </ActionButton>
                </div>
            </div>
            {/* Our class */}
            <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
                {/* Graphic */}
                <div className="relative">
                    <div className="mx-auto rounded-lg">
                        <Carousel slides={benefit_slides} />
                    </div>
                </div>
                {/* description */}
                <div>
                    {/* Title */}
                    <div className="relative">
                        <div>
                            <motion.div
                                initial="hidden" 
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0, x: 50 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                            >
                                <HText>
                                    FITNESS {" "}
                                    <span className="text-red-500">ROOM</span>
                                </HText>
                            </motion.div>
                        </div>
                    </div>
                    {/* Descript */}
                    <motion.div
                        initial="hidden" 
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 }
                        }}
                    >
                        <h3 className="my-4 text-red-900 font-bold">SERVICE RATE</h3>
                        <p className="my-4">
                            <p>1. Students, staff, families of SUT personnel are free of charge.</p>
                            <p>2. SUT alumni pay half the annual membership fee from 5,000 baht to 2,500 baht.</p>
                            <p>3. Third party pay annual membership fee 5,000 baht / daily 100 baht</p>
                        </p>

                        <h3 className="my-4 text-red-900 font-bold">
                            GYM MEMBERSHIP APPLICATION STEPS</h3>
                        <p className="mb-4">
                            <p>1. Must pass a physical fitness test first.</p>
                            <p>
                            2. Must pass the basic knowledge assessment test with more than 75% 
                            (recommended to study from the training media clips, knowledge, knowledge of sports and health facilities)
                            </p>
                            <p>3. Must be trained in the use of exercise equipment first.</p>
                            <p>4. Students, personnel, family members, go to the service page, choose to reserve a physical fitness test time.</p>
                            <p>5. Third parties contact information counter Pay the membership fee and get access to the service immediately.</p>
                        </p>

                        <h3 className="my-4 text-red-900 font-bold">
                            PROCEDURE FOR ACCESSING THE GYM</h3>
                        <p className="mb-4">
                            <p>1. Open the system to reserve the service from 6:00 a.m. onwards.</p>
                            <p>2. Sign in in the sutsport.sut.ac.th system and reserve the service and the time period you want to use the service.</p>
                            <p>3. When arriving at the fitness room Log in to the service in front of the fitness room again.</p>
                            <p>4. Sign out (Sign out) when the service is completed.</p>
                            <p>5. Fitness room opens for reservations through the website from 6:00 a.m.</p>
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
  </section>
}

export default Benefits