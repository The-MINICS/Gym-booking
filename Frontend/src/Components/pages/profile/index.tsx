import { motion } from "framer-motion";
import HText from "@/shared/HText";

function Profile(){
    
    return (
    <div className="w-full">
        <motion.div className="mx-auto w-5/6 pt-24 pb-32">
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
                    <span className="text-red-500">PROFILE</span> MAKE YOU FUN THE RECREATION
                </HText>
                <p className="my-5">
                Recovery and Wellness Facilities: APC understands the importance of recovery 
                and offers facilities such as saunas, steam rooms, cryotherapy chambers, 
                and massage therapy to promote muscle relaxation, reduce soreness, 
                and enhance overall well-being.
                </p>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Profile;