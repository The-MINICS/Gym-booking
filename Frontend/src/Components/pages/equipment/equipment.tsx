import { useState, useEffect } from "react";
import { GetPictures } from "@/services/HttpClientService";
import { PictureInterface } from "@/interfaces/IPicture";
import { motion } from "framer-motion";

function AllEquipment() {
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

    return (
    <section>
        {/* All Equipment */}
        <motion.div className="mx-5 pt-10 pb-10 bg-white rounded-2xl my-10">
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
export default AllEquipment;