import React, { useState } from "react";
import { SigninInterface } from "@/interfaces/ISignin";
import { LoginUser } from "@/services/HttpClientService";
import { motion } from 'framer-motion';
import { SelectedPage } from '@/shared/types';
import HText from "@/shared/HText";
import LoginPageGraphic from "@/assets/LoginPageGraphic.jpg"
import { useForm } from "react-hook-form";
import Alert from "@/shared/Alert";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,
//   ref
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const SignIn = ({setSelectedPage}: Props) => {
  const inputStyles = `mb-3 w-full rounded-lg bg-red-400 px-5 py-3 placeholder-white`;
  const {
    register,
    trigger,
    formState: { errors },
} = useForm();
const onSubmit = async (e: any) => {
    const isValid = await trigger();
    if (!isValid) {
        e.preventDefault();
    }
}
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
                      <p className="my-2">
                        Welcome back love! Please enter your details. if you already a member, easily log in
                      </p>
                </motion.div>

                {/* Fill the form and image*/}
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
                  <div className="bg-white">
                    <div>
                      <label className="text-lg font-semibold text-red-700">Email</label>
                      <input
                        className="w-full border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="text-lg font-semibold text-red-700 my-2">Password</label>
                      <input
                        className="w-full border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-3"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                      <div className="text-black">
                        <input
                          type="checkbox"
                          id="remember"
                        />
                        <label className="ml-2 font-medium text-base" id="remember" >Remember for 30 days</label>
                      </div>
                      <button className="font-medium text-base text-blue-900">Forgot Password</button>
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4">
                      <button className="bg-yellow-500 text-white hover:bg-red-400 text-lg font-bold rounded-xl 
                        py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out">
                          Sign In
                      </button>
                    </div>
                    <div className="mt-4 flex flex-center mx-16">
                      <p className="mr-2">You are not our member yet?</p>
                      <button>
                        <span className="text-purple-500 font-semibold">
                          Become our member
                        </span>
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

export default SignIn