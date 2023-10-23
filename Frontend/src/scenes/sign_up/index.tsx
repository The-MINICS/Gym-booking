import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import { motion } from 'framer-motion';
import HText from "@/shared/HText";
import { useEffect, useState } from 'react';
import { GenderInterface } from '@/interfaces/IGender';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SelectedPage } from '@/shared/types';
import { Grid } from "@mui/material";
import { MemberRequestInterface } from "@/interfaces/IMemberRequest";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
}

function SignUp({setSelectedPage}: Props) {
    const [image, setImage] = React.useState<string | ArrayBuffer | null>("");
    const [memberRequest, setMemberRequest] = useState<MemberRequestInterface>({ Member_datetime: new Date(), });
    const [genders, setGenders] = useState<GenderInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const apiUrl = "http://localhost:9999";

    const onImgChange = (event: any) => {
      const image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const base64Data = reader.result;
        setImage(base64Data)
      }
  };

    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof SignUp;
      const { value } = event.target;
      setMemberRequest({ ...memberRequest, [id]: value });
    };

    const Cancel = () => {
      localStorage.clear();
      window.location.href = "/";
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

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof memberRequest;
      setMemberRequest({
        ...memberRequest,
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
          Firstname: memberRequest.Firstname?? "",
          Lastname: memberRequest.Lastname?? "",
          Username: memberRequest.Username?? "",
          Email: memberRequest.Email?? "",
          Attachment: image,
          Password: memberRequest.Password?? "",
          Phonenumber: memberRequest.Phonenumber?? "",
          Member_datetime: memberRequest.Member_datetime,
          Age: typeof memberRequest.Age === "string" ? parseInt(memberRequest.Age) : 0,
          Weight: typeof memberRequest.Weight === "string" ? parseInt(memberRequest.Weight) : 0,
          Height: typeof memberRequest.Height === "string" ? parseInt(memberRequest.Height) : 0,
          GenderID: convertType(memberRequest.GenderID),
          RoleID: 2,
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

        fetch(`${apiUrl}/member-request`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
              console.log("Saved")
              setSuccess(true);
              setErrorMessage("")
              setTimeout(() => {
                window.location.reload();
              }, 10000);
            } else {
              console.log("Error!")
              setError(true);
              setErrorMessage(res.error)
            }
        });
    }

    return (
        <section id="joinnow" className="w-full bg-gray-20">
          <motion.div className="mx-10 py-10"
          onViewportEnter={() => setSelectedPage(SelectedPage.JoinNow)}>
                {/* Snackbar */}
                <Snackbar
                  id="success"
                  open={success}
                  autoHideDuration={10000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert onClose={handleClose} severity="success">
                      Saved Successfully!: Please wait for email confirmation at "{memberRequest.Email}"
                      within 1-2 business days
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
                    className="md:w-3/5 w-full"
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
                      <Grid container padding={1}>
                        <Grid item xs={5.7} margin={1}>
                          <label className="text-lg font-semibold text-red-700">FirstName</label>
                          <input
                            className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                            placeholder="Fill your Firstname"
                            id="Firstname"
                            name="firstname"
                            type="firstname"
                            autoFocus
                            value={memberRequest.Firstname || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={5.7} margin={1}>
                          <label className="text-lg font-semibold text-red-700">LastName</label>
                          <input
                            className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                            placeholder="Fill your Lastname"
                            id="Lastname"
                            name="lastname"
                            type="string"
                            autoFocus
                            value={memberRequest.Lastname || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={5.7} margin={1}>
                          <label className="text-lg font-semibold text-red-700">Email</label>
                          <input
                            className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                            placeholder="Fill your Email"
                            id="Email"
                            name="email"
                            type="string"
                            autoFocus
                            value={memberRequest.Email || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={5.7} margin={1}>
                          <label className="text-lg font-semibold text-red-700">Password</label>
                          <input
                            className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                            placeholder="Fill your Password"
                            id="Password"
                            name="password"
                            type="password"
                            autoFocus
                            value={memberRequest.Password || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={5.7} margin={1}>
                          <label className="text-lg font-semibold text-red-700">Username</label>
                          <input
                            className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                            placeholder="Fill your Username"
                            id="Username"
                            name="username"
                            type="string"
                            autoFocus
                            value={memberRequest.Username || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={5.7} margin={1}>
                        <label className="text-lg font-semibold text-red-700">Phone Number</label>
                        <input
                          className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                          placeholder="Fill your Email"
                          id="Phonenumber"
                          name="phonenumber"
                          type="string"
                          autoFocus
                          value={memberRequest.Phonenumber || ""}
                          onChange={handleInputChange}
                        />
                        </Grid>
                        <Grid item xs={5.7} margin={1}>
                          <label className="text-lg font-semibold text-red-700">Gender</label>
                          <Select
                            className="border-2 border-red-300 mt-1 bg-transparent mb-4 w-full"
                            native
                            value={memberRequest.GenderID + ""}
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
                        </Grid>
                        <Grid item xs={5.7} margin={1}>
                          <label className="text-lg font-semibold text-red-700">Age</label>
                          <input
                            className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                            placeholder="Fill your Age"
                            id="Age"
                            name="age"
                            type="number"
                            autoFocus
                            value={memberRequest.Age || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={5.7} margin={1}>
                          <label className="text-lg font-semibold text-red-700">Weight(Kg.)</label>
                          <input
                            className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                            placeholder="Fill your Weight"
                            id="Weight"
                            name="weight"
                            type="number"
                            autoFocus
                            value={memberRequest.Weight || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={5.7} margin={1}>
                          <label className="text-lg font-semibold text-red-700">Height(cm.)</label>
                          <input
                            className="w-full border-2 border-red-300 rounded-xl p-3 mt-1 bg-transparent mb-3"
                            placeholder="Fill your Height"
                            id="Height"
                            name="Height"
                            type="number"
                            autoFocus
                            value={memberRequest.Height || ""}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <label className="italic text-red-700">Please attach the member card (Type: *.jpg, *.jpec, *.png)</label>
                        <Grid item xs={11.9} margin={1}>
                          <input accept="image/*" type="file"
                            onChange={onImgChange} 
                          />
                        </Grid>
                      </Grid>

                      <div className="mt-3 flex items-center justify-end gap-2 mr-7">
                          <button 
                            className="text-black bg-slate-300 text-lg font-bold rounded-xl 
                            p-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                            onClick={Cancel}>
                              Cancel
                          </button>
                          <button 
                            className="bg-yellow-500 text-white hover:bg-red-400 text-lg font-bold rounded-xl 
                            p-3 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
                            onClick= {submit}
                            >
                              Become a Member
                          </button>
                      </div>
                </motion.div>

                {/* Image */}
                <motion.div
                        className="basis-2/5 md:mt-0"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        variants={{
                        hidden: { opacity: 0, x:-50 },
                        visible: { opacity: 1, x:-0 },
                        }}>
                        <p className="text-lg font-semibold text-red-700">
                          Attachment Preview:
                        </p>
                        <img 
                          className="w-full rounded-lg bg-auto my-2"
                          src={`${image}`} 
                          alt="preview-cover"
                        />
                    </motion.div>
                </div>
          </motion.div>
        </section>
    )
}

export default SignUp;