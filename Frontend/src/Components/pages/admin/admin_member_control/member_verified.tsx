import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Divider, Grid } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MemberRequestInterface } from "@/interfaces/IMemberRequest";
import { GetMemberRequests } from "@/services/HttpClientService";
import dayjs from "dayjs";

function MemberVerified() {
    let { id } = useParams();
    const [memberRequest, setMemberRequest] = useState<MemberRequestInterface>({});
    const [memberRequests, setMemberRequests] = useState<MemberRequestInterface[]>([]);
    const [openDialog, setOpenDialog] = useState(true);
    const [dialogWidth, setDialogWidth] = useState<number | string>('auto');
    const dialogContentRef = React.createRef<HTMLDivElement>();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const apiUrl = "http://localhost:9999";
    const contentWidth = dialogContentRef.current?.scrollWidth;
    if (contentWidth) {
        setDialogWidth(contentWidth);
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
        setTimeout(() => {
            window.location.href = "/member-manage";
        }, 500);
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

    async function GetMemberRequestByMRID() {
      const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          },
        };
      let res = await fetch(`${apiUrl}/memberrequest/`+id, requestOptions)
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

  const getMemberRequest = async () => {
    let res = await GetMemberRequestByMRID();
    if (res) {
        setMemberRequest(res);
    }
  };

  const getMemberRequests = async () => {
    let res = await GetMemberRequests();
    if (res) {
        setMemberRequests(res);
    }
  };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

  useEffect(() => {
    getMemberRequest();
    getMemberRequests();
  }, []);

    async function accepted() {
      let data = {
        ID: memberRequest.ID,
        StatusID: 5,
      };
      console.log(data)

      const requestOptions = {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" },
          body: JSON.stringify(data),
      };
      
      fetch(`${apiUrl}/acceptrequest`, requestOptions)
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

    async function denied() {
        let data = {
          ID: memberRequest.ID,
          StatusID: 7,
        };
        console.log(data)
  
        const requestOptions = {
          method: "PATCH",
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        
        fetch(`${apiUrl}/denymemberrequest`, requestOptions)
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
                  Saved Successful!!
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
          {/* MemberRequest Update */}
          { openDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md">
                <dialog
                    open={openDialog}
                    style={{
                        width: dialogWidth,
                        border: '1px solid #ccc',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        zIndex: 1000,
                    }}
                    >
                        <div ref={dialogContentRef}
                    >
                        <div className="flex items-stretch justify-end mb-3"> 
                            <button onClick={handleDialogClose}>
                                <CancelIcon style={{ color: "red" }}/>
                            </button>
                        </div>
                        <div className="flex items-center justify-center mb-3">
                          <h1 className="font-bold text-purple-800 font-monserrat text-3xl">
                            Membership Confirmation
                          </h1>
                        </div>
                        <Divider/>
                        <div className="my-3">
                            <React.Fragment>
                                {memberRequests.filter((item) => (item.ID) === convertType(id))
                                    .map((item) => (
                                        <React.Fragment>
                                        <Grid container>
                                            <Grid item xs={8}>
                                                <h1 className="font-bold mb-2 text-red-700">*** Personal Information ***</h1>
                                                <ul className="mt-2 ml-2 space-y-1 text-lg">
                                                  <li>Full-Name: <span className="font-semibold text-red-900">
                                                      {item.Firstname} {item.Lastname}
                                                    </span>
                                                  </li>
                                                  <li>UserName: <span className="font-semibold text-red-900">{item.Username}</span></li>
                                                  <li>Email: <span className="font-semibold text-red-900">{item.Email}</span></li>
                                                  <li>Phone-Number: <span className="font-semibold text-red-900">{item.Phonenumber}</span></li>
                                                  <li>Gender: <span className="font-semibold text-red-900">{item.Gender?.Gender}</span></li>
                                                  <li>Age: <span className="font-semibold text-red-900">{item.Age}</span></li>
                                                  <li>Weight: <span className="font-semibold text-red-900">{item.Weight} kg</span></li>
                                                  <li>Height: <span className="font-semibold text-red-900">{item.Height} cm</span></li>
                                                  <li>Register Date: <span className="font-semibold text-red-900">
                                                      {dayjs(item.Member_datetime).format('YYYY-MM-DD HH:mm')}
                                                    </span>
                                                  </li>
                                                  <li>Status: <span className="font-semibold text-red-900">{item.Status?.State}</span></li>
                                                </ul>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <h1 className="italic text-right text-red-700">Document View:</h1>
                                                <div className="flex items-baseline justify-end">
                                                  <img src={`${item.Attachment}`} width="250" height="150"/>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        </React.Fragment>
                                    ))
                                }
                            </React.Fragment>
                        </div>
                        <Divider/>
                        <div className="flex justify-center items-center gap-3 my-3">
                            <button className="rounded px-2 py-1 text-white font-semibold
                                bg-green-500 active:scale-[.98] active:duration-75 transition-all" 
                                onClick={accepted}
                            >
                                <CheckCircleIcon/> Accept
                            </button>
                            <button className="rounded px-2 py-1 bg-red-600 text-white active:scale-[.98] active:duration-75 transition-all" 
                                onClick={denied}
                            >
                                <CancelIcon/> Deny
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        )}
        </section>
    )
}

export default MemberVerified;