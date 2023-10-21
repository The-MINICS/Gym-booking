import React from "react";
import { MemberInterface } from "@/interfaces/IMember";
import { GetGenders, GetMemberRequests, GetMembers, GetRoles, MemberDelete } from "@/services/HttpClientService";
import MemberIcon from "@/assets/group.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from "@mui/material/ButtonGroup";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {  
    Alert,
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText,  DialogTitle, Divider, Grid, Select, SelectChangeEvent, Slide,  
    Snackbar,  
    Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import dayjs from "dayjs";
import { TransitionProps } from "@mui/material/transitions";
import { GenderInterface } from "@/interfaces/IGender";
import { RoleInterface } from "@/interfaces/IRole";
import { MemberRequestInterface } from "@/interfaces/IMemberRequest";
import VerifiedIcon from '@mui/icons-material/Verified';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import VisibilityIcon from '@mui/icons-material/Visibility';

function MemberManagement() {
    const navigate = useNavigate();
    const [member, setMember] = useState<MemberInterface>({ Member_datetime: new Date(), });
    const [Members, setMembers] = useState<MemberInterface[]>([]);
    const [MemberRequests, setMemberRequests] = useState<MemberRequestInterface[]>([]);
    const [memberRequestID, setMemberRequestID] = useState<number>();
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [roles, setRoles] = useState<RoleInterface[]>([]);
    const [openMemberCreate, setOpenMemberCreate] = useState(false);
    const [openMemberDocument, setOpenMemberDocument] = useState(false);
    const [dialogWidth, setDialogWidth] = useState<number | string>('auto');
    const dialogContentRef = React.createRef<HTMLDivElement>();
    const [deleteID, setDeleteID] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getMembers = async () => {
        let res = await GetMembers();
        if (res) {
            setMembers(res);
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

    const getMemberRequests = async () => {
        let res = await GetMemberRequests();
        if (res) {
            setMemberRequests(res);
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof MemberManagement;
        const { value } = event.target;
        setMember({ ...member, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof member;
        setMember({
          ...member,
          [name]: event.target.value,
        });
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

    const handleDialogMemberCreateOpen = () => {
        setOpenMemberCreate(false);
        const contentWidth = dialogContentRef.current?.scrollWidth;
        if (contentWidth) {
            setDialogWidth(contentWidth);
        }
        setOpenMemberCreate(true);
    }

    const handleDialogMemberCreateClose = () => {
        setOpenMemberCreate(false)
    }

    const handleDialogMemberDocumentOpen = (id: number) => {
        setOpenMemberDocument(false);
        const contentWidth = dialogContentRef.current?.scrollWidth;
        if (contentWidth) {
            setDialogWidth(contentWidth);
        }
        setOpenMemberDocument(true);
        setMemberRequestID(id);
    }

    const handleDialogMemberDocumentClose = () => {
        setOpenMemberDocument(false)
    }

    const handleDialogDeleteOpen = (ID: number) => {
        setDeleteID(ID)
        setOpenDelete(true)
    }
    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID(0)
        }, 500)
    }
    const handleDelete = async () => {
        let res = await MemberDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getMembers();
        setOpenDelete(false)
        setTimeout(() => {
          window.location.href = "/member-manage";
        }, 500);
    }

    const handleDocumentDownload = (id: number) => {
        const memberRequest = MemberRequests.find((item) => item.ID === id);

        if (memberRequest) {
            const downloadLink = document.createElement('a');
            downloadLink.href = memberRequest.Attachment || "";
            downloadLink.download = `${memberRequest.Firstname}_${memberRequest.Lastname}.jpg`;
            downloadLink.click();
        }
    }
  
    useEffect(() => {
        getMembers();
        getMemberRequests();
        getGenders();
        getRoles();
    }, []);
  
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
          children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
      ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

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
                window.location.href = "/member-manage";
              }, 1000);
            } else {
              console.log("Error!")
              setError(true);
              setErrorMessage(res.error)
            }
        });
    }
    
    return(
        <section className="w-full bg-gray-50 py-10">
            <motion.div className="mx-auto w-5/6">
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
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert onClose={handleClose} severity="error">
                    {errorMessage}
                  </Alert>
                </Snackbar>
                {/* Header */}
                    <motion.div
                        className="mx-20"
                        initial="hidden" 
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x:-50 },
                            visible: { opacity: 1, x:-0 }
                        }}
                    >
                        <div className="flex items-center justify-center gap-2 py-3 my-3">
                            <img src={MemberIcon} className="h-16 w-16"/>
                            <h1 className="text-red-500 font-bold text-6xl">Member Management</h1>
                            <img src={MemberIcon} className="h-16 w-16"/>
                        </div>
                    </motion.div>
            </motion.div>

            {/* Tool Option */}
            <motion.div
                className="flex items-center justify-center mb-5 gap-3"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
            >
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-red-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all">
                    <Link to="/" className="flex items-center justify-center gap-2">
                        <HomeIcon/>
                        <p className="font-bold text-xl">Home</p>
                    </Link>
                </button>
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-orange-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all"
                    onClick={() => handleDialogMemberCreateOpen()}
                >
                    <div className="flex items-center justify-center gap-2">
                        <GroupAddIcon/>
                        <p className="font-bold text-xl">Add Member</p>
                    </div>
                </button>
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-purple-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all">
                    <Link to="/admin-tools" className="flex items-center justify-center gap-2">
                        <BuildIcon/>
                        <p className="font-bold text-xl">Administrator Tools</p>
                    </Link>
                </button>
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-green-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all">
                    <Link to="/members" className="flex items-center justify-center gap-2">
                        <PhoneIphoneIcon/>
                        <p className="font-bold text-xl">View Page</p>
                    </Link>
                </button>
            </motion.div>

            {/* Member List */}
            <motion.div
                className="bg-center mx-20"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
            >
                <h1 className="text-3xl font-bold m-1 text-red-500">Member List</h1>
                <TableContainer>
                    <Table className="hover:table-auto -ml-3">
                        <TableHead className="bg-gray-100">
                            <TableRow className="py-2 text-lg font-bold bg-pink-300">
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">UserName</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Full-Name</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Gender</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Email</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Phone</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Age</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Weight(kg)</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Height(cm)</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Role</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Registration Date</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Data</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Action</h4></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="py-2 bg-white">
                                {Members.map((row) => (
                                    <TableRow 
                                            className="py-2"
                                            key={row.ID}
                                        >
                                            <TableCell align="center">{row.Username}</TableCell>
                                            <TableCell align="center">{row.Firstname} {row.Lastname}</TableCell>
                                            <TableCell align="center">{row.Gender?.Gender}</TableCell>
                                            <TableCell align="center">{row.Email}</TableCell>
                                            <TableCell align="center">{row.Phonenumber}</TableCell>
                                            <TableCell align="center">{row.Age}</TableCell>
                                            <TableCell align="center">{row.Weight}</TableCell>
                                            <TableCell align="center">{row.Height}</TableCell>
                                            <TableCell align="center">{row.Role?.Role}</TableCell>
                                            <TableCell align="center">{dayjs(row.Member_datetime).format('YYYY-MM-DD HH:mm')}</TableCell>
                                            <TableCell align="center">
                                                <button
                                                    className="flex items-center justify-center cursor-pointer p-1 border-2 rounded bg-green-600 border-green-700 
                                                    text-white hover:bg-orange-500 active:scale-[.98] active:duration-75 transition-all"
                                                    onClick={() => handleDialogMemberDocumentOpen(Number(row.ID))}
                                                >
                                                    <VisibilityIcon/> Document
                                                </button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup>
                                                    <Button
                                                    startIcon={<EditIcon />}
                                                    className="hover:bg-blue-500 cursor-pointer"
                                                    onClick={() =>
                                                        navigate({ pathname: `/member/update/${row.ID}` })
                                                    }
                                                    >Edit
                                                    </Button>
                                                    <Button
                                                    startIcon={<DeleteIcon />}
                                                    className="hover:bg-red-500 cursor-pointer"
                                                    color="error"
                                                    onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                    >Del
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>

            {/* List of members waiting for confirmation */}
            <motion.div
                className="bg-center mx-20 my-8"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
            >
                <h1 className="text-xl font-bold italic m-1 text-red-500">
                    *List Of Members Waiting For Confirmation
                </h1>
                <TableContainer>
                    <Table className="hover:table-auto -ml-3">
                        <TableHead className="bg-gray-100">
                            <TableRow className="py-2 text-lg font-bold bg-red-300">
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Attachment</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">UserName</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Full-Name</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Gender</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Email</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Phone</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Age</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Weight(kg)</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Height(cm)</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Date</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Action</h4></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="py-2 bg-white">
                                {MemberRequests.map((row) => (
                                    <TableRow 
                                            className={(row.StatusID === 6) ? "" : "bg-slate-100"}
                                            key={row.ID}
                                        >
                                            <TableCell align="center">
                                                <button
                                                    className="cursor-pointer p-1 border-2 rounded bg-blue-600 border-blue-700 text-white
                                                    hover:bg-purple-500 active:scale-[.98] active:duration-75 transition-all"
                                                    onClick={() => handleDocumentDownload(Number(row.ID))}
                                                    >
                                                        <DownloadForOfflineIcon/> Document
                                                </button>
                                            </TableCell>
                                            <TableCell align="center">{row.Username}</TableCell>
                                            <TableCell align="center">{row.Firstname} {row.Lastname}</TableCell>
                                            <TableCell align="center">{row.Gender?.Gender}</TableCell>
                                            <TableCell align="center">{row.Email}</TableCell>
                                            <TableCell align="center">{row.Phonenumber}</TableCell>
                                            <TableCell align="center">{row.Age}</TableCell>
                                            <TableCell align="center">{row.Weight}</TableCell>
                                            <TableCell align="center">{row.Height}</TableCell>
                                            <TableCell align="center">{dayjs(row.Member_datetime).format('YYYY-MM-DD HH:mm')}</TableCell>
                                            <TableCell align="center">
                                                {(row.StatusID === 6) ? (
                                                    <ButtonGroup>
                                                        <Button
                                                            startIcon={<VerifiedIcon/>}
                                                            className="cursor-pointer p-1"
                                                            color="success"
                                                            onClick={() =>
                                                                navigate({ pathname: `/member/verified/update/${row.ID}` })
                                                            }
                                                        >
                                                            verified
                                                        </Button>
                                                    </ButtonGroup>
                                                ):(
                                                    <p className="italic">{row.Status?.State}</p>
                                                )}
                                            </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </motion.div>

            {/* Open MemberCreate */}
            {openMemberCreate && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
                    <dialog
                        open={openMemberCreate}
                        onClose={handleDialogMemberCreateClose}
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
                        <div ref={dialogContentRef}>
                            <div>
                                <h1 className="text-center font-bold text-purple-800 font-monserrat text-3xl mb-3">
                                    Member Register
                                </h1>
                                <Divider/>
                            </div>
                            <div className="my-3">
                                <p className="font-bold text-amber-900 text-center">
                                    *** Personal Information ***
                                </p>
                                <Grid container padding={1}>
                                    <Grid item xs={5.7} margin={1}>
                                        <label id="Firstname" className="font-medium">FirstName</label>
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
                                        <label id="Lastname" className="font-medium">LastName</label>
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
                                        <label id="Phonenumber" className="font-medium">Phone Number</label>
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
                                        <label id="Gender" className="font-medium">Gender</label>
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
                                        <label id="Age" className="font-medium">Age</label>
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
                                        <label id="Weight" className="font-medium">Weight(Kg.)</label>
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
                                        <label id="Height" className="font-medium">Height(cm.)</label>
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
                                    <p className="font-bold text-amber-900 text-center">
                                        *** General Information ***
                                    </p>
                                    <Grid container padding={1}>
                                        <Grid item xs={5.7} margin={1}>
                                            <label id="Email" className="font-medium">Email</label>
                                            <input
                                                className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                                                id="Email"
                                                type="string"
                                                value={member.Email || ""}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={5.7} margin={1}>
                                            <label id="Password" className="font-medium">Password</label>
                                            <input
                                                className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                                                placeholder="Enter Phone Number for Default Password"
                                                id="Password"
                                                type="password"
                                                value={member.Password || ""}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={5.7} margin={1}>
                                            <label id="Username" className="font-medium">Username</label>
                                            <input
                                                className="rounded w-full h-auto bg-transparent border-slate-100 border-2 mt-1 p-1"
                                                id="Username"
                                                type="string"
                                                value={member.Username || ""}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={5.7} margin={1}>
                                            <label id="Role" className="font-medium">Role</label>
                                            <Select
                                                native
                                                id="Role"
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
                                    onClick={() => handleDialogMemberCreateClose()}
                                >
                                    <CancelIcon/> Cancel
                                </button>
                                <button className="rounded px-2 py-1 text-white font-semibold
                                    bg-green-500 active:scale-[.98] active:duration-75 transition-all" 
                                    onClick={submit}
                                >
                                    <CheckCircleIcon/> Submit
                                </button>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}

            {/* MemberRequest Update */}
          { openMemberDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md">
                <dialog
                    open={openMemberDocument}
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
                        <div className="flex items-center justify-center mb-3">
                          <h1 className="font-bold text-purple-800 font-monserrat text-3xl">
                            Membership Confirmation History
                          </h1>
                        </div>
                        <Divider/>
                        <div className="my-3">
                            <React.Fragment>
                                {MemberRequests.filter((items) => (items.ID) === memberRequestID)
                                    .map((items) => (
                                        <React.Fragment>
                                        <Grid container>
                                            <Grid item xs={8}>
                                                <h1 className="font-bold mb-2 text-red-700">*** Personal Information ***</h1>
                                                <ul className="mt-2 ml-2 space-y-1 text-lg">
                                                  <li>Full-Name: <span className="font-semibold text-red-900">
                                                      {items.Firstname} {items.Lastname}
                                                    </span>
                                                  </li>
                                                  <li>UserName: <span className="font-semibold text-red-900">{items.Username}</span></li>
                                                  <li>Email: <span className="font-semibold text-red-900">{items.Email}</span></li>
                                                  <li>Phone-Number: <span className="font-semibold text-red-900">{items.Phonenumber}</span></li>
                                                  <li>Gender: <span className="font-semibold text-red-900">{items.Gender?.Gender}</span></li>
                                                  <li>Age: <span className="font-semibold text-red-900">{items.Age}</span></li>
                                                  <li>Weight: <span className="font-semibold text-red-900">{items.Weight} kg</span></li>
                                                  <li>Height: <span className="font-semibold text-red-900">{items.Height} cm</span></li>
                                                  <li>Register Date: <span className="font-semibold text-red-900">
                                                      {dayjs(items.Member_datetime).format('YYYY-MM-DD HH:mm')}
                                                    </span>
                                                  </li>
                                                  <li>Status: <span className="font-semibold text-red-900">{items.Status?.State}</span></li>
                                                </ul>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <h1 className="italic text-right text-red-700">Document View:</h1>
                                                <div className="flex items-baseline justify-end">
                                                  <img src={`${items.Attachment}`} width="250" height="150"/>
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
                            <button className="rounded px-2 py-1 bg-red-600 text-white active:scale-[.98] active:duration-75 transition-all" 
                                onClick={handleDialogMemberDocumentClose}
                            >
                                <CancelIcon/> Close
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        )}

            {/* Delete Dialog */}
            <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            If you delete this account then you won't be able to recover any more. 
                            Do you want to delete this account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color= "error" onClick={handleDialogDeleteclose}>Cancel</Button>
                        <Button color= "secondary" onClick={handleDelete} className="bg-red-500" autoFocus>
                          Confirm
                        </Button>
                    </DialogActions>
            </Dialog>
        </section>
    )
}
export default MemberManagement;