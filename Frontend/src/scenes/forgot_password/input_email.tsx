import { motion } from 'framer-motion';
import { SelectedPage } from '@/shared/types';
import HText from "@/shared/HText";
import LoginPageGraphic from "@/assets/LoginPageGraphic.jpg"
import React, { useState } from "react";
import { ForgotPasswordInterface } from "@/interfaces/IForgotPassword";
import { ForgotPassword } from '@/services/HttpClientService';
import { Alert, Snackbar } from '@mui/material';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

function InputEmail({setSelectedPage}: Props){
    const [error, setError] = useState(false);
    const [forgot, setForgot] = useState<ForgotPasswordInterface>({});
    const [success, setSuccess] = useState(false);

    const Cancel = () => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof forgot;
        const { value } = event.target;
        setForgot({ ...forgot, [id]: value });
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
      let res = await ForgotPassword(forgot);
      if (res) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/";
      }, 1000);
      } else { 
        setError(true);
      };
    };
  

  return (
    <section id="joinnow" className="w-full bg-gray-50">
            <motion.div className="mx-auto w-5/6 pt-24 pb-32"
                onViewportEnter={() => setSelectedPage(SelectedPage.JoinNow)}>
                {/* login success */}
                <Snackbar
                  open={success}
                  autoHideDuration={5000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert onClose={handleClose} severity="success">
                    Please check your email
                  </Alert>
                </Snackbar>
                {/* login failure */}
                <Snackbar
                  open={error}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert onClose={handleClose} severity="error">
                    Email incorrcted!
                  </Alert>
                </Snackbar>
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
                        <span className="text-red-500">FIND</span> YOUR ACCOUNT
                    </HText>
                      <p className="my-2">
                        Please enter Email associated with the account to search for your account.
                      </p>
                </motion.div>

                {/* Fill the form and image */}
                <div className="mt-5 justify-between gap-8 md:flex">
                  <motion.div
                      className="mt-5 basis-3/5 md:mt-0"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5 }}
                      variants={{
                          hidden: { opacity: 0, y: 50 },
                          visible: { opacity: 1, y: 0 },
                      }}
                  >
                  {/* fill the form */}
                  <div className="bg-gray-50">
                    <div>
                      <input
                        className="w-full border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4"
                        placeholder="Email Address"
                        id="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={forgot.Email || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="mt-4 flex flex-col gap-y-4">
                      <button 
                        className="bg-yellow-500 text-white hover:bg-red-400 text-lg font-bold rounded-xl 
                        py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                        onClick={submit}
                        >
                          Submit
                      </button>
                      <button 
                        className="text-black bg-slate-300 text-lg font-bold rounded-xl 
                        py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                        onClick={Cancel}>
                          Cancel
                      </button>
                    </div>
                    </div>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                      className="mt-16 basis-3/5 md:mt-0"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5 }}
                      variants={{
                      hidden: { opacity: 0, x:-50 },
                      visible: { opacity: 1, x:-0 },
                      }}>
                      <img
                        className="w-full rounded-lg bg-auto"
                        alt="login-page-graphic"
                        src={LoginPageGraphic}
                      />
                      <div className="relative">
                          <div className="before:absolute before:-bottom-30 before:-right-10 
                            before:z-[-1] md:before:content-evolvetext">
                          </div>
                      </div>
                  </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default InputEmail;