import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { GetRooms } from "@/services/HttpClientService";
import { RoomInterface } from "@/interfaces/IRoom";
import { useEffect, useState } from "react";
import Class from "./class";
import { Link } from "react-router-dom";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';

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
                            <HText>
                                <span className="text-red-500 font-bold">RECREATION ROOM</span>
                            </HText>
                            <p className="py-5">
                                Escape the everyday and step into a world of endless fun 
                                and relaxation with our spectacular Recreation Room! 🌟
                            </p>
                        </div>
                    </motion.div>
                    <div className="my-5 h-[653px] w-full overflow-x-auto overflow-y-hidden">
                        <ul className="w-[2800px] whitespace-nowrap">
                            {Rooms.map((item, index) => (
                                <Class
                                    key={`${item.Activity}-${index}`}
                                    name={item.Activity}
                                    description={item.Caption}
                                    room={item.Number}
                                    attendant={item.Attendant}
                                    image={item.Illustration}
                                />
                            ))}
                        </ul>
                    </div>
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
                        <button className="rounded-md bg-yellow-500 px-10 py-3 hover:bg-red-400
                        hover:text-white active:scale-[.98] active:duration-75 transition-all">
                            <Link to="/bookings" className="flex items-center justify-center gap-2">
                                <LaptopChromebookIcon/>
                                <p className="font-bold text-xl">Book Now</p>
                            </Link>
                        </button>
                    </motion.div>
            </motion.div>
        </section>
    )
}

export default Recreations;