import React from "react";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { MemberInterface } from "@/interfaces/IMember";
import { useEffect, useState } from "react";
import { Alert, Divider, Grid, Snackbar } from "@mui/material";
import { GetMemberByMID } from "@/services/HttpClientService";

function ResetPassword() {
    const [member, setMember] = useState<MemberInterface>({});
    const [CHpasswordShow] = useState("");

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof member;
        const { value } = event.target;
        setMember({ ...member, [id]: value });
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

    const GetMember = async () => {
        let res = await GetMemberByMID();
        if (res) {
            setMember(res);
        }
    };

    useEffect(() => {
        GetMember();
    }, []);

    async function PasswordSubmit() {
        let data = {
            ID: member.ID,
            NewPassword: member.NewPassword?? "",
            ConfirmNewPassword: member.ConfirmNewPassword?? "", 
        };
        console.log(data)
        const apiUrl = "http://localhost:9999";

        const requestOptions = {
            method: "PATCH",
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
      
        fetch(`${apiUrl}/reset-password`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
              console.log("Saved")
              setSuccess(true);
              setErrorMessage("")
            } else {
              console.log("Error!")
              setError(true);
              setErrorMessage(res.error)
            }
        });
    }
    
    return (
    <div className="w-full">
        <motion.div className="mx-16 w-5/6 pt-10">
            {/* Snackbar */}
            <Snackbar
                id="success"
                open={success}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                <Alert onClose={handleClose} severity="success">
                    Saved Successfully
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
                    {errorMessage}
                </Alert>
            </Snackbar>

            {/* Header */}
            <motion.div
                className="md:w-3/5 mx-14"
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
                    <span className="text-red-500 font-bold text-2xl">Account Settings</span>
                </HText>
            </motion.div>
        </motion.div>
                    <Grid item xs={9} boxShadow={1}>
                        <div className="bg-white p-3">
                            <React.Fragment>
                            
                                {(CHpasswordShow === "chpassword") && (
                                    <React.Fragment>
                                        <h1 className="font-bold text-2xl my-2">Change My Password</h1>
                                        <Divider/>
                                        <Grid container>
                                            <Grid item xs={11.9} margin={1}>
                                                <label id="NewPassword" className="font-medium">New Password</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="NewPassword"
                                                    name="new_password"
                                                    type="password"
                                                    autoFocus
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={11.9} margin={1}>
                                                <label id="ConfirmNewPassword" className="font-medium">Confirm New Password</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="ConfirmNewPassword"
                                                    name="confirm_new_password"
                                                    type="password"
                                                    autoFocus
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        <div className="flex items-baseline justify-end gap-2 mt-3 text-right m-4">
                                            <button className="p-2 bg-blue-500 rounded text-white border-2
                                                hover:bg-purple-500 active:scale-[.98] active:duration-75 transition-all"
                                                onClick= {PasswordSubmit}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        </div>
                    </Grid>
    
    </div>
  );
                                }
export default  ResetPassword;