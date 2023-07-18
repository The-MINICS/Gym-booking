import { SelectedPage } from '@/shared/types';
import { motion } from 'framer-motion';
import HText from "@/shared/HText";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const SignUp = ({setSelectedPage}: Props) => {
  return (
    <section id="signup" className="w-full">
        <motion.div className="mx-auto w-5/6 pt-24 pb-32"
            onViewportEnter={() => setSelectedPage(SelectedPage.SignUp)}>
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
                    <span className="text-red-500">JOIN NOW</span>: TO GET IN SHAPE
                </HText>
                <p className="my-5">
                Nutrition Guidance: In addition to exercise, APC provides nutritional guidance 
                through dietitians and nutritionists. They offer customized meal plans, 
                dietary advice, and educational resources to help members optimize their nutrition 
                and achieve their fitness goals.Nutrition Guidance: In addition to exercise, 
                APC provides nutritional guidance through dietitians and nutritionists. 
                They offer customized meal plans, dietary advice, 
                and educational resources to help members optimize their nutrition 
                and achieve their fitness goals.
                </p>
            </motion.div>

            {/* Fill the form */}
            
        </motion.div>
    </section>
  )
}

export default SignUp