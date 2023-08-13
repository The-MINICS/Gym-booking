import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { GetPictures } from "@/services/HttpClientService";
import { TransitionProps } from '@mui/material/transitions';
import { PictureInterface } from "@/interfaces/IPicture";
import { Slide } from '@mui/material';

function Equipments(){
    const [Equipments, setEquipments] = useState<PictureInterface[]>([]);

    const getPictures = async () => {
        let res = await GetPictures();
        if (res) {
            setEquipments(res);
      }
    };

    useEffect(() => {
        getPictures();
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
    <section id="equipments" className="w-full">
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

        {/* Equipment */}
        <motion.div className="mx-auto w-5/6 pt-10 pb-10 bg-white rounded-2xl mb-10">
            <div className="justify-between gap-8 md:flex">
                <motion.div> 
                    {Equipments.map((row) => (
                        <section className="flex items-center px-10 py-10">
                            {/* Title and Describe */}
                            <motion.div
                                className="basis-3/5 md:mt-0"
                                initial="visible" 
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    visible: { opacity: 1, x:-0 }
                                }}
                            >
                                <h1 className="text-orange-600 text-3xl font-bold mx-14 text-center">{row.Title}</h1>
                                <p className="my-2 font-semibold text-xl font-sans">{row.Describe}</p>
                            </motion.div>
                            
                            {/* Ilustration */}
                            <motion.div
                                className="mt-16 basis-2/5 md:mt-0 flex items-center justify-center"
                                initial="visible" 
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                                variants={{
                                    visible: { opacity: 1, x:-0 }
                                }}>
                                <div className="relative">
                                    <div>
                                        <img
                                            className="rounded-lg bg-auto"
                                            alt="illustration-page-graphic"
                                            src={`${row.Picture}`}
                                            width="450" 
                                            height="350"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </section>
                    ))}  
                </motion.div>   
            </div>
        </motion.div>
    </section>
  )
}

export default Equipments;