import React, { ChangeEvent } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import HText from "@/shared/HText";
import { MemberInterface } from "@/interfaces/IMember";
import { useEffect, useState } from "react";
import UserPhoto from '@/assets/UserProfile.png';
import AdminPhoto from '@/assets/AdministratorProfile.png';
import { Alert, Divider, Grid, Snackbar } from "@mui/material";
import { GetGenders, GetMemberByMID } from "@/services/HttpClientService";
import { GenderInterface } from "@/interfaces/IGender";

function AccountSettings() {
    const [member, setMember] = useState<MemberInterface>({});
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [generalShow, setGeneralShow] = useState("general");
    const [CHpasswordShow, setCHpasswordShow] = useState("");
    const [general, setGeneral] = useState(true);
    const [CHpassword, setCHpassword] = useState(false);
    const roles = localStorage.getItem("role");

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const NonHoldstate = `shadow font-medium text-left pl-5 p-2
    active:scale-[.98] active:duration-75 transition-all`
    const Holdstate = `bg-yellow-400 p-2 shadow pl-5 font-bold text-left
    active:scale-[.98] active:duration-75 transition-all`

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof member;
        const { value } = event.target;
        setMember({ ...member, [id]: value });
    };

    const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const gender = event.target.value;
        member.GenderID = convertType(gender);
    }

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

    const getGenders = async () => {
        let res = await GetGenders();
        if (res) {
          setGenders(res);
        }
    };

    const signout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const handleGeneralClicked = (key: any) => {
        setGeneral(true);
        setCHpassword(false);
        setGeneralShow(key);
        setCHpasswordShow("");
    }

    const handleCHpasswordClicked = (key: any) => {
        setGeneral(false);
        setCHpassword(true);
        setGeneralShow("");
        setCHpasswordShow(key);
    }

    useEffect(() => {
        GetMember();
        getGenders();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
          ID: member.ID,
          Firstname: member.Firstname?? "",
          Lastname: member.Lastname?? "",
          Username: member.Username?? "",
          Email: member.Email?? "",
          Password: member.Password?? "",
          Phonenumber: member.Phonenumber?? "",
          Member_datetime: member.Member_datetime,
          Age: typeof member.Age === "string" ? parseInt(member.Age) : 0,
          Weight: typeof member.Weight === "string" ? parseInt(member.Weight) : 0,
          Height: typeof member.Height === "string" ? parseInt(member.Height) : 0,
          GenderID: convertType(member.GenderID),
          RoleID: convertType(member.RoleID),
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
        
        fetch(`${apiUrl}/members`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
          console.log(res)
          if (res.data) {
            console.log("Saved")
            setSuccess(true);
            setErrorMessage("")
            setTimeout(() => {
              window.location.href = "/account-setting";
            }, 1000);
          } else {
            console.log("Error!")
            setError(true);
            setErrorMessage(res.error)
            }
        });
    }

    async function PasswordSubmit() {
        let data = {
            ID: member.ID,
            OldPassword: member.OldPassword?? "",
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
      
        fetch(`${apiUrl}/changepassword`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
              console.log("Saved")
              setSuccess(true);
              setErrorMessage("")
              signout()
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

        {/* Profile */}
        <motion.div
            className="mx-auto w-5/6 bg-white mt-2 mb-10 p-2"
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
                hidden: { opacity: 0, x:-50 },
                visible: { opacity: 1, x:-0 }
            }}
            >
            <div className="h-auto">
                <Grid container>
                    <Grid item xs={3} boxShadow={1}>
                        <div className="bg-white py-2">
                            <div className="items-center justify-center text-center m-2">
                                <div className="flex items-center justify-center">{ImageOption()}</div>
                                <p className="text-center text-lg font-bold">~{member.Firstname} {member.Lastname}~</p>
                                <p className="text-center text-base font-medium">
                                    {member.Username} : ({member.Role?.Role})
                                </p>
                                <p className="font-medium text-center text-base italic">
                                    Registration Date: {dayjs(member.Member_datetime).format('YYYY-MM-DD')}
                                </p>
                            </div>
                            <Divider/>
                            <div className="grid">
                                <button onClick={() => handleGeneralClicked("general")} 
                                    className={general ? `${Holdstate}` : `${NonHoldstate}`}
                                    >
                                        General Information
                                </button>
                                <button onClick={() => handleCHpasswordClicked("chpassword")} 
                                    className={CHpassword ? `${Holdstate}` : `${NonHoldstate}`}
                                    >
                                        Change My Password
                                </button>
                            </div>
                            <div className="mt-28 flex justify-end items-center gap-1 mr-2">
                                <button className="text-white p-1 rounded font-medium bg-green-600">New Account</button>
                                <button onClick={signout}
                                    className="text-white p-1 rounded font-medium bg-red-500">
                                        Sign Out
                                </button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={9} boxShadow={1}>
                        <div className="bg-white p-3">
                            <React.Fragment>
                                {(generalShow === "general") && (
                                    <React.Fragment>
                                        <h1 className="font-bold text-2xl my-2">General Information</h1>
                                        <Divider/>
                                        <Grid container>
                                            <Grid item xs={11.9} margin={1}>
                                                <label id="Username" className="font-medium">UserName</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="Username"
                                                    name="username"
                                                    type="string"
                                                    autoFocus
                                                    value={member.Username || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={5.8} margin={1}>
                                                <label id="Firstname" className="font-medium">FirstName</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="Firstname"
                                                    name="firstname"
                                                    type="string"
                                                    autoFocus
                                                    value={member.Firstname || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={5.8} margin={1}>
                                                <label id="Lastname" className="font-medium">LastName</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="Lastname"
                                                    name="lastname"
                                                    type="string"
                                                    autoFocus
                                                    value={member.Lastname || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={5.8} margin={1}>
                                                <label id="Email" className="font-medium">Email</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="Email"
                                                    name="email"
                                                    type="string"
                                                    autoFocus
                                                    value={member.Email || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={5.8} margin={1}>
                                                <label id="Phone" className="font-medium">Phone Number</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="Phone"
                                                    name="phone"
                                                    type="string"
                                                    autoFocus
                                                    value={member.Phonenumber || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={2.8} margin={1}>
                                            <label id="Gender" className="font-medium">Gender</label>
                                            <select
                                                id="Gender"
                                                className="rounded p-1 font-medium cursor-pointer border-2 w-full"
                                                value={member.GenderID + ""}
                                                onChange={handleGenderChange}
                                                >
                                                <option className="text-gray-300">Choose your Gender</option>
                                                {genders.map((item: GenderInterface) => (
                                                    <option value={item.ID} key={item.ID}>
                                                        {item.Gender}
                                                    </option>
                                                ))}
                                            </select>
                                            </Grid>
                                            <Grid item xs={2.8} margin={1}>
                                            <label id="Age" className="font-medium">Age</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="Age"
                                                    name="age"
                                                    type="number"
                                                    autoFocus
                                                    value={member.Age || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={2.8} margin={1}>
                                            <label id="Weight" className="font-medium">Weight</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="Weight"
                                                    name="weight"
                                                    type="number"
                                                    autoFocus
                                                    value={member.Weight || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={2.8} margin={1}>
                                            <label id="Height" className="font-medium">Height</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="Height"
                                                    name="height"
                                                    type="number"
                                                    autoFocus
                                                    value={member.Height || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        <div className="flex items-baseline justify-end gap-2 mt-3 text-right m-4">
                                            <button className="p-2 bg-blue-500 rounded text-white border-2 
                                                hover:bg-purple-500 active:scale-[.98] active:duration-75 transition-all"
                                                onClick= {submit}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )}
                                {(CHpasswordShow === "chpassword") && (
                                    <React.Fragment>
                                        <h1 className="font-bold text-2xl my-2">Change My Password</h1>
                                        <Divider/>
                                        <Grid container>
                                            <Grid item xs={11.9} margin={1}>
                                                <label id="OldPassword" className="font-medium">Current Password</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="OldPassword"
                                                    name="old_password"
                                                    type="password"
                                                    autoFocus
                                                    value={member.OldPassword || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={11.9} margin={1}>
                                                <label id="NewPassword" className="font-medium">New Password</label>
                                                <input
                                                    className="w-full border-2 rounded p-1 text-black"
                                                    id="NewPassword"
                                                    name="new_password"
                                                    type="password"
                                                    autoFocus
                                                    value={member.NewPassword || ""}
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
                                                    value={member.ConfirmNewPassword || ""}
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
                </Grid>
            </div>
        </motion.div>
    </div>
  );

  function ImageOption() {
    if (roles === 'User') {
      return (
      <img className='w-36 h-36 mb-1 justify-center' src={UserPhoto} alt='user-photo'/>
      )
    }
    if (roles === 'Admin') {
      return(
      <img className='w-36 h-36 mb-1 justify-center' src={AdminPhoto} alt='admin-photo'/>
      )
    }
  }
}

export default AccountSettings;