import { motion } from "framer-motion";
import { SelectedPage } from "@/shared/types";
import HText from "@/shared/HText";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const OurClass = ({setSelectedPage}: Props) => {
    
    return (
    <section id="ourclass" className="w-full">
        <motion.div className="mx-auto w-5/6 pt-24 pb-32"
            onViewportEnter={() => setSelectedPage(SelectedPage.OurClass)}>
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
                    <span className="text-red-500">OUR CLASS</span> MAKE YOU FUN THE RECREATION
                </HText>
                <p className="my-5">
                Recovery and Wellness Facilities: APC understands the importance of recovery 
                and offers facilities such as saunas, steam rooms, cryotherapy chambers, 
                and massage therapy to promote muscle relaxation, reduce soreness, 
                and enhance overall well-being.
                </p>
            </motion.div>
        </motion.div>
    </section>
  )
}

export default OurClass;