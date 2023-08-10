import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { EquipmentInterface } from "@/interfaces/IEquipment";
//import { GetEquipments } from "@/services/HttpClientService";
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from "@mui/material";

function Equipments(){
    const [Equipments, setEquipments] = useState<EquipmentInterface[]>([]);

    // const getEquipments = async () => {
    //     let res = await GetEquipments();
    //     if (res) {
    //         setEquipments(res);
    //   }
    // };

    useEffect(() => {
        // getEquipments();
    }, []);

    const Transition = React.forwardRef(function Transition(
      props: TransitionProps & {
        children: React.ReactElement<any, any>;
      },
      ref: React.Ref<unknown>,
    ) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
    <section id="equipments" className="w-full bg-white">
        <motion.div className="mx-auto w-5/6 pt-10 pb-10 justify-between">
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
                    <span className="text-red-500">ALL EQUIPMENTS:</span> WE PROUND TO PRESENT YOU
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

        {/* Equipments */}
        <motion.div
            className="mx-auto ml-24"
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
                hidden: { opacity: 0, x:-50 },
                visible: { opacity: 1, x:-0 }
            }}
        >
            <HText>
                <span>All Equipment in our gym</span>
            </HText>
            </motion.div>
    </section>
  )
}

export default Equipments;