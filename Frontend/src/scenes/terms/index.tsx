import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import ActionButton from "@/shared/ActionButton";
import img1 from "@/assets/fitness_room1.jpg";
import img2 from "@/assets/fitness_room2.jpg";
import img3 from "@/assets/fitness_room3.jpg";
import Carousel from "./carousel_terms";

const terms_slides = [img1, img2, img3];

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Benefits = ({setSelectedPage}: Props) => {
  return <section id="terms" className="w-full py-20 bg-gray-20">
        <motion.div
            className="w-5/6 mx-auto min-h-full"
            onViewportEnter={() => setSelectedPage(SelectedPage.Terms)}>
            {/* Graphics and description */}
            {/* Our class */}
            <div className="mt-16 items-center justify-between gap-10 md:mt-28 md:flex">
                {/* Graphic */}
                <div className="relative">
                    <div className="mx-auto rounded-lg">
                        <Carousel slides={terms_slides} />
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
                                    Membership Terms {" "}
                                    <span className="text-red-500"> AND </span>
                                    <span className="text-blue-800">Conditions</span>
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
                        <p className="mb-8">
                            <p>1. Open the system to reserve the service from 6:00 a.m. onwards.</p>
                            <p>2. Sign in in the sutsport.sut.ac.th system and reserve the service and the time period you want to use the service.</p>
                            <p>3. When arriving at the fitness room Log in to the service in front of the fitness room again.</p>
                            <p>4. Sign out (Sign out) when the service is completed.</p>
                            <p>5. Fitness room opens for reservations through the website from 6:00 a.m.</p>
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