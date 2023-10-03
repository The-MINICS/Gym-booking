import { motion } from "framer-motion";
import HText from "@/shared/HText";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from 'react';
import { MemberInterface } from '@/interfaces/IMember';
import { Link, useParams } from "react-router-dom";

function ChangePSW(){
    let { id } = useParams();
    const [member, setMember] = useState<MemberInterface>({});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const apiUrl = "http://localhost:9999";

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

      async function GetMemberByMID() {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            },
        };
    
        let res = await fetch(`${apiUrl}/member/`+id, requestOptions)
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
            if (res) {
            setMember(res);
            }
        };

        useEffect(() => {
            getMembers();
        }, []);

        async function submit() {
            let data = {
                ID: member.ID,
                OldPassword: member.OldPassword?? "",
                NewPassword: member.NewPassword?? "",
                ConfirmNewPassword: member.ConfirmNewPassword?? "", 
            };
            console.log(data)
    
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
                  setTimeout(() => {
                    window.location.href = "/profile";
                  }, 1000);
                } else {
                  console.log("Error!")
                  setError(true);
                  setErrorMessage(res.error)
                }
            });
        }
    

    return (
    <div className="w-full">
        <motion.div className="mx-auto w-5/6 pt-24 pb-32">
            {/* Snackbar */}
            <Snackbar
                id="success"
                open={success}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                <Alert onClose={handleClose} severity="success">
                    Password changed successfully
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
                    Sorry!! We can not update your information : {errorMessage}
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
                    <span className="text-red-500">CHANGE YOUR PASSWORD</span> MAKE YOU FUN THE RECREATION
                </HText>
                <p className="my-5">
                Recovery and Wellness Facilities: APC understands the importance of recovery 
                and offers facilities such as saunas, steam rooms, cryotherapy chambers, 
                and massage therapy to promote muscle relaxation, reduce soreness, 
                and enhance overall well-being.
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
                        <label className="text-lg font-semibold text-red-700">Old Password</label>
                        <input
                          className="w-full border-2 rounded-xl p-3 mt-1 mb-3 text-white border-black bg-red-400"
                          placeholder="Enter your OldPassword"
                          id="OldPassword"
                          name="old_password"
                          type="password"
                          autoFocus
                          value={member.OldPassword || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">New Password</label>
                        <input
                          className="w-full border-2 rounded-xl p-3 mt-1 mb-3 text-white border-black bg-red-400"
                          placeholder="Enter your NewPassword"
                          id="NewPassword"
                          name="new_password"
                          type="password"
                          autoFocus
                          value={member.NewPassword || ""}
                          onChange={handleInputChange}
                        />
                        <label className="text-lg font-semibold text-red-700">Confirm New Password</label>
                        <input
                          className="w-full border-2 rounded-xl p-3 mt-1 mb-3 text-white border-black bg-red-400"
                          placeholder="Enter your ConfirmNewPassword"
                          id="ConfirmNewPassword"
                          name="confirm_new_password"
                          type="password"
                          autoFocus
                          value={member.ConfirmNewPassword || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-y-4">
                          <button 
                            className="bg-yellow-500 text-white hover:bg-red-400 text-lg font-bold rounded-xl 
                            py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                            onClick= {submit}
                            >
                              Edit Now
                          </button>
                      </div>
                      <div className="mt-4 flex flex-col gap-y-4">
                          <button 
                            className="bg-gray-50 text-lg font-bold rounded-xl 
                            py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                            >
                              <Link to="/member-manage">
                                Cancel
                              </Link>
                          </button>
                      </div>
                </motion.div>
                </div>           
        </motion.div>
    </div>
  )
}

export default ChangePSW;

// import MuiAlert, { AlertProps } from "@mui/material/Alert";
// import React from 'react';
// import Snackbar from "@mui/material/Snackbar";
// import { motion } from 'framer-motion';
// import HText from "@/shared/HText";
// import { useEffect, useState } from 'react';
// import { MemberInterface } from '@/interfaces/IMember';
// import { Link, useParams } from "react-router-dom";

// function ChangePSW() {
//     let { id } = useParams();
//     const [member, setMember] = useState<MemberInterface>({});

//     const [success, setSuccess] = useState(false);
//     const [error, setError] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");

//     const apiUrl = "http://localhost:9999";

//     const handleInputChange = (
//       event: React.ChangeEvent<{ id?: string; value: any }>
//   ) => {
//       const id = event.target.id as keyof typeof member;
//       const { value } = event.target;
//       setMember({ ...member, [id]: value });
//   };

//     const handleClose = (
//         event?: React.SyntheticEvent | Event,
//         reason?: string
//     ) => {
//         if (reason === "clickaway") {
//           return;
//         }
//         setSuccess(false);
//         setError(false);
//     };

//     async function GetMemberByMID() {
//         const requestOptions = {
//             method: "GET",
//             headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//             },
//         };
    
//         let res = await fetch(`${apiUrl}/member/`+id, requestOptions)
//             .then((response) => response.json())
//             .then((res) => {
//             if (res.data) {
//                 return res.data;
//             } else {
//                 return false;
//             }
//             });
//             return res;
//     }

//   const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props,
//     ref
//   ) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

//     const getMembers = async () => {
//         let res = await GetMemberByMID();
//         if (res) {
//         setMember(res);
//         }
//     };
    
//     useEffect(() => {
//         getMembers();
//     }, []);

//     async function submit() {
//         let data = {
//             OldPassword: member.OldPassword?? "",
//             NewPassword: member.NewPassword?? "",
//             ConfirmNewPassword: member.ConfirmNewPassword?? "",     
//         };
//         console.log(data)

//         const requestOptions = {
//             method: "PATCH",
//             headers: { 
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//         };
      
//         fetch(`${apiUrl}/changepassword`, requestOptions)
//           .then((response) => response.json())
//           .then((res) => {
//             console.log(res)
//             if (res.data) {
//               console.log("Saved")
//               setSuccess(true);
//               setErrorMessage("")
//               setTimeout(() => {
//                 window.location.href = "/chpassword";
//               }, 1000);
//             } else {
//               console.log("Error!")
//               setError(true);
//               setErrorMessage(res.error)
//             }
//         });
//     }

//     return (
//         <section className="w-full bg-gray-20">
//           <motion.div className="mx-auto w-5/6 pt-12 pb-32">
//                 {/* Snackbar */}
//                 <Snackbar
//                   id="success"
//                   open={success}
//                   autoHideDuration={5000}
//                   onClose={handleClose}
//                   anchorOrigin={{ vertical: "top", horizontal: "center" }}
//                   >
//                     <Alert onClose={handleClose} severity="success">
//                       Your information was updated
//                     </Alert>
//                 </Snackbar>
//                 <Snackbar
//                   id="error"
//                   open={error}
//                   autoHideDuration={6000}
//                   onClose={handleClose}
//                   anchorOrigin={{ vertical: "top", horizontal: "center" }}
//                 >
//                   <Alert onClose={handleClose} severity="error">
//                     Sorry!! We can not update your information : {errorMessage}
//                   </Alert>
//                 </Snackbar>

//                 {/* Header */}
//                 <motion.div
//                     className="md:w-3/5"
//                     initial="hidden" 
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.5 }}
//                     transition={{ duration: 0.5 }}
//                     variants={{
//                         hidden: { opacity: 0, x:-50 },
//                         visible: { opacity: 1, x:-0 }
//                     }}
//                 >
//                     <HText>
//                         <span className="text-red-500">WELCOME</span> TO OUR FAMILY
//                     </HText>
//                     <p className="my-5">
//                     It's important to note that the fitness industry is constantly evolving, 
//                     and new state-of-the-art gyms may emerge with even more advanced features in the future.
//                     </p>
//                 </motion.div>

//                 {/* Fill the form and image */}
//                 <div className="mt-5 justify-between gap-8 md:flex">
//                   <motion.div
//                     className="mt-5 basis-3/5 md:mt-0"
//                     initial="hidden" 
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.5 }}
//                     transition={{ duration: 0.5 }}
//                     variants={{
//                         hidden: { opacity: 0, y: 50 },
//                         visible: { opacity: 1, y: 0 }
//                     }}
//                   >
//                     {/* Fill the form */}
//                     <div>
//                         <label className="text-lg font-semibold text-red-700">Old Password</label>
//                         <input
//                           className="w-full border-2 rounded-xl p-3 mt-1 mb-3 text-white border-black bg-red-400"
//                           placeholder="Enter your Old Password"
//                           id="OldPassword"
//                           name="old_password"
//                           type="password"
//                           autoFocus
//                           value={member.OldPassword || ""}
//                           onChange={handleInputChange}
//                         />
//                         <label className="text-lg font-semibold text-red-700">New Password</label>
//                         <input
//                           className="w-full border-2 rounded-xl p-3 mt-1 mb-3 text-white border-black bg-red-400"
//                           placeholder="Enter your New Password"
//                           id="NewPassword"
//                           name="new_password"
//                           type="password"
//                           autoFocus
//                           value={member.NewPassword || ""}
//                           onChange={handleInputChange}
//                         />
//                         <label className="text-lg font-semibold text-red-700">Confirm New Password</label>
//                         <input
//                           className="w-full border-2 rounded-xl p-3 mt-1 mb-3 text-white border-black bg-red-400"
//                           placeholder="Enter your Confirm New Password"
//                           id="ConfirmNewPassword"
//                           name="confirm_new_password"
//                           type="password"
//                           autoFocus
//                           value={member.ConfirmNewPassword || ""}
//                           onChange={handleInputChange}
//                         />
//                       </div>
                      
//                       <div className="mt-5 flex flex-col gap-y-4">
//                           <button 
//                             className="bg-yellow-500 text-white hover:bg-red-400 text-lg font-bold rounded-xl 
//                             py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
//                             onClick= {submit}
//                             >
//                               Edit Now
//                           </button>
//                       </div>
//                       <div className="mt-2 flex flex-col gap-y-4">
//                           <button 
//                             className="bg-red-500 text-lg font-bold rounded-xl text-white
//                             py-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
//                             >
//                               <Link to="/chpassword">
//                                 Cancel
//                               </Link>
//                           </button>
//                       </div>
//                 </motion.div>
//                 </div>
//           </motion.div>
//         </section>
//     )
// }

// export default ChangePSW;