import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import { motion } from 'framer-motion';
import HText from "@/shared/HText";
import { useEffect, useState } from 'react';
import { MemberInterface } from '@/interfaces/IMember';
import { SelectedPage } from '@/shared/types';
import { GetMembers } from "@/services/HttpClientService";
import { useNavigate } from "react-router-dom";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

function SignUp({setSelectedPage}: Props) {
    const navigate = useNavigate();
    const [members, setMembers] = useState<MemberInterface[]>([]);
    const [phoneNumber, setPhoneNumber] = useState("");

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

    const getMembers = async () => {
      let res = await GetMembers();
      if (res) {
        setMembers(res);
      }
    };

    useEffect(() => {
      getMembers();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    return (
        <section id="joinnow" className="w-full bg-gray-20">
          <motion.div className="mx-auto w-5/6 pt-24 pb-32"
          onViewportEnter={() => setSelectedPage(SelectedPage.JoinNow)}>
                {/* Snackbar */}
                <Snackbar
                  id="success"
                  open={success}
                  autoHideDuration={5000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert onClose={handleClose} severity="success">
                      Saved Successfully!
                    </Alert>
                </Snackbar>
                <Snackbar
                  id="error"
                  open={error}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert onClose={handleClose} severity="error">
                    Save failed!! : {errorMessage}
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
                        <span className="text-red-500">WELCOME</span> TO OUR FAMILY
                    </HText>
                    <p className="my-5">
                    It's important to note that the fitness industry is constantly evolving, 
                    and new state-of-the-art gyms may emerge with even more advanced features in the future.
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
                        visible: { opacity: 1, y: 0 }
                    }}
                  >
                    {/* Fill the form */}
                    <div>
                        <label className="text-lg font-semibold text-red-700">Please fill your phone number in that registered</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          id="PhoneNumber"
                          name="phonenumber"
                          type="string"
                          autoFocus
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    {members.filter((item) => (item.Phonenumber) === phoneNumber)
                        .map((item) => (
                            <div className="mt-4 flex flex-col gap-y-4">
                                <button 
                                    className="bg-yellow-500 text-white hover:bg-red-400 text-lg font-bold rounded-xl 
                                    py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                                    onClick={() =>
                                      navigate({ pathname: `/member/update/${item.ID}` })
                                    }
                                    >
                                    Next
                                </button>
                    </div>
                        ))
                    }
                    </motion.div>
                </div>
          </motion.div>
        </section>
    )
}

export default SignUp;