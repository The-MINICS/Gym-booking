import React from "react";
import { MemberInterface } from "@/interfaces/IMember";
import { GetMembers, MemberDelete } from "@/services/HttpClientService";
import MemberIcon1 from "@/assets/group.png";
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
import {  
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText,  DialogTitle, Slide,  
    Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import dayjs from "dayjs";
import { TransitionProps } from "@mui/material/transitions";

function MemberManagement() {
    const navigate = useNavigate();
    const [Members, setMembers] = useState<MemberInterface[]>([]);
    const [deleteID, setDeleteID] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);

    const getMembers = async () => {
        let res = await GetMembers();
        if (res) {
            setMembers(res);
        }
    };

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
  
      useEffect(() => {
        getMembers();
      }, []);
  
      const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
          children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
      ) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
    
    return(
        <section className="w-full bg-gray-50 py-10">
            <motion.div className="mx-auto w-5/6">
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
                            <img src={MemberIcon1} className="h-16 w-16"/>
                            <h1 className="text-red-500 font-bold text-6xl">Member Management</h1>
                            <img src={MemberIcon1} className="h-16 w-16"/>
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
                hover:text-white active:scale-[.98] active:duration-75 transition-all">
                    <Link to="/member-create" className="flex items-center justify-center gap-2">
                        <GroupAddIcon/>
                        <p className="font-bold text-xl">Add Member</p>
                    </Link>
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
                <TableContainer className="">
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
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Registration Date</h4></TableCell>
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
                                            <TableCell align="center">{dayjs(row.Member_datetime).format('YYYY-MM-DD HH:mm')}</TableCell>
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