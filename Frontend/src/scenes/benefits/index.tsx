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


type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Benefits = ({setSelectedPage}: Props) => {
  return <section id="benefits" className="mx-auto min-h-full w-5/6 py-10">
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
        </motion.div>
  </section>
}

export default Benefits