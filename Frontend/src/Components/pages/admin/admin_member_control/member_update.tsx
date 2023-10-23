import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from 'react';
import { MemberInterface } from '@/interfaces/IMember';
import { GenderInterface } from '@/interfaces/IGender';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import { GetGenders, GetRoles } from "@/services/HttpClientService";
import { RoleInterface } from "@/interfaces/IRole";
import { Divider, Grid } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function MemberUpdate() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState<MemberInterface>({});
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [roles, setRoles] = useState<RoleInterface[]>([]);

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

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof member;
      setMember({
        ...member,
        [name]: event.target.value,
      });
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
    getMembers();
    getGenders();
    getRoles();
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

      const requestOptions = {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" },
          body: JSON.stringify(data),
      };
      
      fetch(`${apiUrl}/member-admin`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
        console.log(res)
        if (res.data) {
          console.log("Saved")
          setSuccess(true);
          setErrorMessage("")
          setTimeout(() => {
            window.location.href = "/member-manage";
          }, 1000);
        } else {
          console.log("Error!")
          setError(true);
            setErrorMessage(res.error)
          }
        });
    }

    return (
        <section className="bg-slate-50 py-20">
          {/* Snackbar */}
            <Snackbar
              id="success"
              open={success}
              autoHideDuration={5000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert onClose={handleClose} severity="success">
                  Updated Successful
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
          {/* Member Update */}
          <div className="bg-white border-2 rounded-md p-1 w-4/5 bg-center mx-auto">
              <div className="m-2">
                <h1 className="text-center font-bold text-purple-800 font-monserrat text-3xl mb-3">
                  Edit Member
                </h1>
                <Divider/>
              </div>
              <div className="my-3">
                  <p className="font-bold text-red-600 text-center">
                    *** Personal Information ***
                  </p>
                  <Grid container padding={1}>
                    <Grid item xs={5.7} margin={1}>
                      <label id="Firstname" className="font-medium text-black">FirstName</label>
                      <input
                        className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                        id="Firstname"
                        type="string"
                        autoFocus
                        value={member.Firstname || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={5.7} margin={1}>
                      <label id="Lastname" className="font-medium text-black">LastName</label>
                      <input
                        className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                        id="Lastname"
                        type="string"
                        autoFocus
                        value={member.Lastname || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={5.7} margin={1}>
                      <label id="Phonenumber" className="font-medium text-black">Phone Number</label>
                      <input
                        className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                        id="Phonenumber"
                        type="string"
                        autoFocus
                        value={member.Phonenumber || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={5.7} margin={1}>
                      <label id="Gender" className="font-medium text-black">Gender</label>
                      <Select
                        native
                        id="Gender"
                        className="border-1 border-slate-100 mt-1 bg-transparent w-full h-9 rounded"
                        value={member.GenderID + ""}
                        onChange={handleChange}
                        inputProps={{
                            name: "GenderID",
                        }}
                        >
                          <option>Choose Gender</option>
                          {genders.map((item: GenderInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.Gender}
                            </option>
                          ))}
                      </Select>
                    </Grid>
                    <Grid item xs={3.7} margin={1}>
                      <label id="Age" className="font-medium text-black">Age</label>
                      <input
                        className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                        id="Age"
                        type="number"
                        autoFocus
                        value={member.Age || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={3.7} margin={1}>
                      <label id="Weight" className="font-medium text-black">Weight(Kg.)</label>
                      <input
                        className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                        id="Weight"
                        type="number"
                        autoFocus
                        value={member.Weight || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={3.7} margin={1}>
                      <label id="Height" className="font-medium text-black">Height(cm.)</label>
                      <input
                        className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                        id="Height"
                        type="number"
                        autoFocus
                        value={member.Height || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                  <div className="my-3">
                    <p className="font-bold text-red-600 text-center">
                      *** General Information ***
                    </p>
                    <Grid container padding={1}>
                      <Grid item xs={5.7} margin={1}>
                        <label id="Email" className="font-medium text-black">Email</label>
                        <input
                          className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                          id="Email"
                          type="string"
                          autoFocus
                          value={member.Email || ""}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={5.7} margin={1}>
                        <label id="Password" className="font-medium text-black">Password</label>
                        <input
                          className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                          placeholder="Change a new password"
                          id="Password"
                          type="string"
                          autoFocus
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={5.7} margin={1}>
                        <label id="Username" className="font-medium text-black">Username</label>
                        <input
                          className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                          id="Username"
                          type="string"
                          autoFocus
                          value={member.Username || ""}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={5.7} margin={1}>
                        <label id="Gender" className="font-medium text-black">Role</label>
                        <Select
                          native
                          id="Gender"
                          className="border-1 border-slate-100 mt-1 bg-transparent w-full h-9 rounded"
                          value={member.RoleID + ""}
                          onChange={handleChange}
                          inputProps={{
                              name: "RoleID",
                          }}
                          >
                            <option>Choose Role</option>
                            {roles.map((item: RoleInterface) => (
                              <option value={item.ID} key={item.ID}>
                                {item.Role}
                              </option>
                            ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <Divider/>
                <div className="flex justify-center items-center gap-3 my-3">
                  <button className="rounded px-2 py-1 bg-red-600 text-white active:scale-[.98] active:duration-75 transition-all" 
                    onClick={() => navigate({ pathname: `/member-manage` })}
                  >
                    <CancelIcon/> Back
                  </button>
                  <button className="rounded px-2 py-1 text-white font-semibold
                    bg-green-500 active:scale-[.98] active:duration-75 transition-all" 
                    onClick={submit}
                  >
                    <CheckCircleIcon/> Submit
                  </button>
                </div>
              </div>
        </section>
    )
}

export default MemberUpdate;