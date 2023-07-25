import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import { SelectedPage } from '@/shared/types';
import { motion } from 'framer-motion';
import HText from "@/shared/HText";
import { useEffect, useState } from 'react';
import { MemberInterface } from '@/interfaces/IMember';
import { GenderInterface } from '@/interfaces/IGender';
import { RoleInterface } from '@/interfaces/IRole';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import LoginPageGraphic from "@/assets/LoginPageGraphic.jpg"

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = ({setSelectedPage}: Props) => {
    const [members, setMembers] = useState<MemberInterface>();
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [roles, setRoles] = useState<RoleInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const apiUrl = "http://localhost:9999";

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof SignUp;
        const { value } = event.target;
        setMembers({ ...members, [id]: value });
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
      const name = event.target.name as keyof typeof members;
      setMembers({
        ...members,
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

    async function GetRoles() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/roles`, requestOptions)
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

    const getGenders = async () => {
      let res = await GetGenders();
      if (res) {
       setGenders(res);
      }
    };

    const getRoles = async () => {
      let res = await GetRoles();
      if (res) {
      setRoles(res);
      }
    };
    
    useEffect(() => {
      getGenders();
      getRoles();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
          Member_firstname: members?.Firstname,
          Member_lastname: members?.Lastname,
          Member_username: members?.Username,
          Member_email: members?.Email,
          Member_password: members?.Password,
          Member_age: members?.Age,
          Member_weight: members?.Weight,
          Member_height: members?.Height,
          GenderID: convertType(members?.GenderID),
          RoleID: convertType(members?.RoleID),
        };
        console.log(data)

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
        <section id="signup" className="w-full bg-gray-20">
          <motion.div className="mx-auto w-5/6 pt-24 pb-32"
                onViewportEnter={() => setSelectedPage(SelectedPage.SignUp)}>
                {/* Snackbar */}
                <Snackbar
                  id="success"
                  open={success}
                  autoHideDuration={5000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
                    className="md:w-full"
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

                {/* Fill the form */}
                <motion.div
                  className="md:w-full"
                  initial="hidden" 
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                      hidden: { opacity: 0, x:-50 },
                      visible: { opacity: 1, x:-0 }
                  }}
                >
                    <div>
                      <p className="text-lg font-semibold text-red-700 w-auto">FirstName</p>
                      <input
                        className="border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4 w-3/6"
                        placeholder="Enter your FirstName"
                        id="Firstname"
                        name="firstname"
                        autoComplete="firstname"
                        autoFocus
                        required
                        value={members?.Firstname || ""}
                        onChange={handleInputChange}
                      />
                      <p className="text-lg font-semibold text-red-700 w-auto">LastName</p>
                      <input
                        className="border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4 w-3/6"
                        placeholder="Enter your Lastname"
                        id="Lastname"
                        name="lastname"
                        autoComplete="lastname"
                        autoFocus
                        required
                        value={members?.Lastname || ""}
                        onChange={handleInputChange}
                      />
                      <p className="text-lg font-semibold text-red-700 w-auto">Username</p>
                      <input
                        className="border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4 w-3/6"
                        placeholder="Enter your Username"
                        id="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        required
                        value={members?.Username || ""}
                        onChange={handleInputChange}
                      />
                      <p className="text-lg font-semibold text-red-700 w-auto">Email</p>
                      <input
                        className="border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4 w-3/6"
                        placeholder="Enter your Email"
                        id="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        required
                        value={members?.Email || ""}
                        onChange={handleInputChange}
                      />
                      <p className="text-lg font-semibold text-red-700 w-auto">Password</p>
                      <input
                        className="border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4 w-3/6"
                        placeholder="Enter your Password"
                        id="Password"
                        name="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        value={members?.Password || ""}
                        onChange={handleInputChange}
                      />
                      <p className="text-lg font-semibold text-red-700 w-auto">Gender</p>
                      <Select
                        className="border-2 border-red-300 p-4 mt-1 bg-transparent mb-4 w-3/6 rounded-xl"
                        required
                        native
                        value={members?.GenderID + ""}
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
                      <p className="text-lg font-semibold text-red-700 w-auto">Age</p>
                      <input
                        className="border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4 w-3/6"
                        placeholder="Enter your Age"
                        id="Age"
                        name="age"
                        autoComplete="age"
                        autoFocus
                        required
                        value={members?.Age || ""}
                        onChange={handleInputChange}
                      />
                      <p className="text-lg font-semibold text-red-700 w-auto">Weight</p>
                      <input
                        className="border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4 w-3/6"
                        placeholder="Enter your Weight"
                        id="Weight"
                        name="weight"
                        autoComplete="weight"
                        autoFocus
                        required
                        value={members?.Weight || ""}
                        onChange={handleInputChange}
                      />
                      <p className="text-lg font-semibold text-red-700 w-auto">Height</p>
                      <input
                        className="border-2 border-red-300 rounded-xl p-4 mt-1 bg-transparent mb-4 w-3/6"
                        placeholder="Enter your Height"
                        id="Height"
                        name="height"
                        autoComplete="height"
                        autoFocus
                        required
                        value={members?.Height || ""}
                        onChange={handleInputChange}
                      />
                      <p className="text-lg font-semibold text-red-700 w-auto">Role</p>
                      <Select
                        className="border-2 border-red-300 p-4 mt-1 bg-transparent mb-4 w-3/6 rounded-xl"
                        required
                        native
                        value={members?.RoleID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "RoleID",
                        }}>
                        <option className="text-gray-300">Your Role</option>
                        {roles.map((item: RoleInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.Role}
                            </option>
                        ))}
                      </Select>
                    </div>
                    
                    <div className="mt-8 flex flex-col gap-y-4">
                      <button 
                        className="bg-yellow-500 text-white hover:bg-red-400 text-lg font-bold rounded-xl 
                        py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                        onClick= {submit}
                        >
                          Create a Member
                      </button>
                    </div>
              </motion.div>
          </motion.div>
        </section>
    )
}

export default SignUp;