import React, { useState } from "react";
import { SigninInterface } from "@/interfaces/ISignin";
import { LoginUser } from "@/services/HttpClientService";
import { motion } from 'framer-motion';
import { SelectedPage } from '@/shared/types';
import HText from "@/shared/HText";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

const SignIn = ({setSelectedPage}: Props) => {
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const submit = async () => {
    let res = await LoginUser(signin);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else { setError(true); };
  };

  return (
    <section id="signin" className="w-full">
            <motion.div className="mx-auto w-5/6 pt-24 pb-32"
                onViewportEnter={() => setSelectedPage(SelectedPage.SignIn)}>
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
                        <span className="text-red-500">JOIN NOW</span> TO GET IN SHAPE
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
    );
}

export default SignIn