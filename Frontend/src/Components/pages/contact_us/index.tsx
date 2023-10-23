import { motion } from "framer-motion";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ContactUsPageGraphic from "@/assets/ContactUsPageGraphic.jpg"
import HText from "@/shared/HText";
import { ContactUsInterface } from "@/interfaces/IContactus";
import { MemberInterface } from "@/interfaces/IMember";
import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {GetMemberByMID} from "@/services/HttpClientService";
import Snackbar from "@mui/material/Snackbar";

function ContactUs(){
    const inputStyles = `mb-3 w-full rounded-lg bg-red-400 px-5 py-3 placeholder-white text-white`;
    const [contactus, setContactus] =  useState<ContactUsInterface>({});
    const [members, setMembers] = useState<MemberInterface>();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof ContactUs;
        const { value } = event.target;
        setContactus({ ...contactus, [id]: value });
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

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof contactus;
        setContactus({
          ...contactus,
          [name]: event.target.value,
        });
    };

    const apiUrl = "http://localhost:9999";

    async function ContactUs(data: ContactUsInterface) {
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
      
        let res = await fetch(`${apiUrl}/contactuses`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              return res.data;
            } else {
              return false;
            }
          });
      
        return res;
    }

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const getMembers = async () => {
        let res = await GetMemberByMID();
        contactus.MemberID = res.ID;
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

    async function submit() {
        let data = {
            Subject: contactus.Subject,
            Message: contactus.Message,
            MemberID: convertType(contactus.MemberID),
        };
        console.log(data)

        const apiUrl = "http://localhost:9999";

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        };
      
        fetch(`${apiUrl}/contactuses`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
              console.log("Saved")
              setSuccess(true);
              setErrorMessage("")
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              console.log("can not save")
              setError(true);
              setErrorMessage(res.error)
            }
        });
    }

    return (
    <div className="w-full bg-gray-20">
        <motion.div className="mx-auto w-5/6 pt-20 pb-20">
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
                    <span className="text-red-500">CONTACT US</span>: YOURE PROBLEM IS UNDER OUR RESPONSIBILITY
                </HText>
            </motion.div>

            {/* Form and image */}
            <div className="mt-10 justify-between gap-8 md:flex">
                <motion.div
                    className="mt-10 basis-3/5 md:mt-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                {/* Form */}
                <p className="text-base font-bold text-red-800">User Name</p>
                <Select
                    className="mb-3 w-full rounded-lg bg-red-200 px-2 py-0"
                    disabled
                    native
                    type="text"
                    value={contactus.MemberID + ""}
                    onChange={handleChange}
                        inputProps={{
                            name: "MemberID",
                        }}
                    >
                    <option value={members?.ID} key={members?.ID}>
                        {members?.Username}
                    </option> 
                </Select>
                <p className="text-base font-bold text-red-800">FULL NAME</p>
                <Select
                    className="mb-3 w-full rounded-lg bg-red-200 px-2 py-0"
                    disabled
                    native
                    type="text"
                    value={contactus.MemberID + ""}
                    onChange={handleChange}
                        inputProps={{
                            name: "MemberID",
                        }}
                    >
                    <option value={members?.ID} key={members?.ID}>
                        {members?.Firstname} {members?.Lastname}
                    </option> 
                </Select>
                <input
                    className={inputStyles}
                    placeholder="SUBJECT"
                    id="Subject"
                    name="subject"
                    type="string"
                    autoFocus
                    value={contactus.Subject || ""}
                    onChange={handleInputChange}
                />
                <textarea
                    className={inputStyles}
                    placeholder="MESSAGE"
                    id="Message"
                    name="message"
                    rows={4}
                    cols={50}
                    autoFocus
                    value={contactus.Message || ""}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    onClick={submit}
                    className="mt-3 rounded-lg bg-yellow-400 px-20 py-3 duration-500 hover:bg-red-200 text-lg font-bold
                    active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                    >
                    SUBMIT
                </button>
                </motion.div>
                {/* ContactPageGraphic */}
                <motion.div
                    className="mt-16 basis-2/5 md:mt-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 },
                    }}>
                    <div className="relative">
                        <div className="before:absolute before:-bottom-20 before:-right-10 
                            before:z-[-1] md:before:content-evolvetext">
                            <img
                                className="w-full rounded-lg bg-auto"
                                alt="contact-us-page-graphic"
                                src={ContactUsPageGraphic}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    </div>
  )
}

export default ContactUs