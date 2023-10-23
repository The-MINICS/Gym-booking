import React from "react";
import { GetContactUs, ContactUsDelete } from "@/services/HttpClientService";
import ComplaintIcon from "@/assets/complaint-handle.png"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ButtonGroup from "@mui/material/ButtonGroup";
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import {  
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText,  DialogTitle, Slide,  
    Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import { TransitionProps } from "@mui/material/transitions";
import { ContactUsInterface } from "@/interfaces/IContactus";
import CheckIcon from '@mui/icons-material/Check';

function ComplaintHandling() {
    const navigate = useNavigate();
    const [ContactUs, setContactUs] = useState<ContactUsInterface[]>([]);
    const [deleteID, setDeleteID] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);

    const getContactUs = async () => {
        let res = await GetContactUs();
        if (res) {
            setContactUs(res);
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
        let res = await ContactUsDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getContactUs();
        setOpenDelete(false)
        setTimeout(() => {
          window.location.href = "/complaint-handle";
        }, 500);
      }
  
      useEffect(() => {
        getContactUs();
      }, []);
  
      const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
          children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
      ) {
        return <Slide direction="up" ref={ref} {...props} />;
      }
    );
    
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
                            <img src={ComplaintIcon} className="h-16 w-16"/>
                            <h1 className="text-red-500 font-bold text-6xl">Complaint Handling</h1>
                            <img src={ComplaintIcon} className="h-16 w-16"/>
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
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-purple-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all">
                    <Link to="/admin-tools" className="flex items-center justify-center gap-2">
                        <BuildIcon/>
                        <p className="font-bold text-xl">Administrator Tools</p>
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
                <TableContainer className="p-2 rounded">
                    <Table className="hover:table-auto -ml-3">
                        <TableHead className="bg-gray-100">
                            <TableRow className="py-2 text-lg font-bold bg-pink-300">
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">No.</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Topic</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Body Messages</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Name</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Email</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Action</h4></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="py-2 bg-white">
                                {ContactUs.map((row) => (
                                    <TableRow 
                                            className="py-2"
                                            key={row.ID}
                                        >
                                            <TableCell align="center">{row.ID}</TableCell>
                                            <TableCell align="center">{row.Subject}</TableCell>
                                            <TableCell align="center">{row.Message}</TableCell>
                                            <TableCell align="center">{row.Member?.Firstname} {row.Member?.Lastname}</TableCell>
                                            <TableCell align="center">{row.Member?.Email}</TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup>
                                                    <Button
                                                    startIcon={<CheckIcon />}
                                                    color="success"
                                                    onClick={() => { handleDialogDeleteOpen(Number(row.ID)) }}
                                                        >Complete
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
                            Are you sure that you have finished this issue completely, This issue will be
                            deleted immediately and will not be able to recovery
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color= "error" onClick={handleDialogDeleteclose}>Cancel</Button>
                        <Button color= "secondary" onClick={handleDelete} className="bg-red-500" autoFocus>
                          Finished
                        </Button>
                    </DialogActions>
            </Dialog>
        </section>
    )
}
export default ComplaintHandling;