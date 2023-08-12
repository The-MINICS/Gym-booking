import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import { motion } from 'framer-motion';
import HText from "@/shared/HText";
import { useEffect, useState } from 'react';
import { MemberInterface } from '@/interfaces/IMember';
import { GenderInterface } from '@/interfaces/IGender';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SignUpPageGraphic1 from "@/assets/SignUpPageGraphic1.jpg";
import SignUpPageGraphic2 from "@/assets/SignUpPageGraphic2.jpg";
import SignUpPageGraphic3 from "@/assets/SignUpPageGraphic3.jpg";
import { SelectedPage } from '@/shared/types';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

function SignUp({setSelectedPage}: Props) {
    const [member, setMember] = useState<MemberInterface>({ Member_datetime: new Date(), });
    const [genders, setGenders] = useState<GenderInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const apiUrl = "http://localhost:9999";

    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
      const id = event.target.id as keyof typeof SignUp;
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

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof member;
      setMember({
        ...member,
        [name]: event.target.value,
      });
    };

    async function GetGenders() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/genders`, requestOptions)
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

    const getGenders = async () => {
      let res = await GetGenders();
      if (res) {
       setGenders(res);
      }
    };
    
    useEffect(() => {
      getGenders();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
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
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
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
                window.location.reload();
              }, 1000);
            } else {
              console.log("Error!")
              setError(true);
              setErrorMessage(res.error)
            }
        });
    }

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
                        <label className="text-lg font-semibold text-red-700">FirstName</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Enter your FirstName"
                          id="Firstname"
                          name="firstname"
                          type="firstname"
                          autoFocus
                          value={member.Firstname || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">LastName</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Enter your Lastname"
                          id="Lastname"
                          name="lastname"
                          type="string"
                          autoFocus
                          value={member.Lastname || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">Username</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Enter your Username"
                          id="Username"
                          name="username"
                          type="string"
                          autoFocus
                          value={member.Username || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">Email</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Enter your Email"
                          id="Email"
                          name="email"
                          type="string"
                          autoFocus
                          value={member.Email || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">Password</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Enter your Password"
                          id="Password"
                          name="password"
                          type="password"
                          autoFocus
                          value={member.Password || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">Phone Number</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Enter your Email"
                          id="Phonenumber"
                          name="phonenumber"
                          type="string"
                          autoFocus
                          value={member.Phonenumber || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">Gender</label>
                        <Select
                          className="border-2 border-red-300 mt-1 bg-transparent mb-4 w-full rounded-2xl"
                          native
                          value={member.GenderID + ""}
                          onChange={handleChange}
                          inputProps={{
                              name: "GenderID",
                          }}>
                          <option className="text-gray-300">Choose your Gender</option>
                          {genders.map((item: GenderInterface) => (
                              <option value={item.ID} key={item.ID}>
                                {item.Gender}
                              </option>
                          ))}
                        </Select>
                        <label className="text-lg font-semibold text-red-700">Age</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Enter your Age"
                          id="Age"
                          name="age"
                          type="number"
                          autoFocus
                          value={member.Age || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">Weight(Kg.)</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Enter your Weight"
                          id="Weight"
                          name="weight"
                          type="number"
                          autoFocus
                          value={member.Weight || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">Height(cm.)</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Enter your Height"
                          id="Height"
                          name="Height"
                          type="number"
                          autoFocus
                          value={member.Height || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-y-4">
                          <button 
                            className="bg-yellow-500 text-white hover:bg-red-400 text-lg font-bold rounded-xl 
                            py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                            onClick= {submit}
                            >
                              Create a Member
                          </button>
                      </div>
                </motion.div>

                {/* Image */}
                <motion.div
                        className="mt-16 basis-3/5 md:mt-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                        hidden: { opacity: 0, x:-50 },
                        visible: { opacity: 1, x:-0 },
                        }}>
                        <img
                          className="w-full rounded-lg bg-auto my-2"
                          alt="login-page-graphic"
                          src={SignUpPageGraphic1}
                        />
                        <img
                          className="w-full rounded-lg bg-auto my-2"
                          alt="login-page-graphic"
                          src={SignUpPageGraphic2}
                        />
                        <img
                          className="w-full rounded-lg bg-auto my-2"
                          alt="login-page-graphic"
                          src={SignUpPageGraphic3}
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
    )
}

export default SignUp;