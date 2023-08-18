import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { GetRooms } from "@/services/HttpClientService";
import { RoomInterface } from "@/interfaces/IRoom";
import { useEffect, useState } from "react";

function Recreations(){
    const [Rooms, setRooms] = useState<RoomInterface[]>([]);

    const getRooms = async () => {
        let res = await GetRooms();
        if (res) {
            setRooms(res);
      }
    };

    useEffect(() => {
        getRooms();
    }, []);
    
    return (
        <section className="w-full bg-gray-50 py-10">
            <motion.div className="mx-auto w-5/6">
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
                        <div className="md:w-3/5">
                            <HText>RECREATION ROOM</HText>
                            <p className="py-5">
                                Escape the everyday and step into a world of endless fun 
                                and relaxation with our spectacular Recreation Room! 🌟
                            </p>
                        </div>
                    </motion.div>
                    <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
                        <ul className="w-[2800px] whitespace-nowrap">

                        </ul>
                    </div>
            </motion.div>
        </section>
    )
}

export default Recreations;