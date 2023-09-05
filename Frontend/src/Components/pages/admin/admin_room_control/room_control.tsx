import React from "react";
import { GetRooms, RoomDelete } from "@/services/HttpClientService";
import RoomIcon1 from "@/assets/room1.png";
import RoomIcon2 from "@/assets/room2.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from "@mui/material/ButtonGroup";
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import {  
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText,  DialogTitle, Slide, Table,  TableBody,  
    TableCell,  TableContainer, TableHead,  TableRow,    
} from '@mui/material';
import { TransitionProps } from "@mui/material/transitions";
import { RoomInterface } from "@/interfaces/IRoom";
import RoomCreate from "./room_create";

function RoomManagement() {
    const navigate = useNavigate();
    const [showRoomCreate, setShowRoomCreate] = useState(false);
    const [Rooms, setRooms] = useState<RoomInterface[]>([]);
    const [deleteID, setDeleteID] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);

    const handleOnClose = () => {
        setShowRoomCreate(false);
    }

    const getRooms = async () => {
        let res = await GetRooms();
        if (res) {
            setRooms(res);
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
        let res = await RoomDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getRooms();
        setOpenDelete(false)
        setTimeout(() => {
          window.location.href = "/room-mannage";
        }, 500);
    }
  
      useEffect(() => {
        getRooms();
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
                            <img src={RoomIcon1} className="h-16 w-16"/>
                            <h1 className="text-red-500 font-bold text-6xl">Recreation Room</h1>
                            <img src={RoomIcon2} className="h-16 w-16"/>
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
                    onClick={() => setShowRoomCreate(true)}
                >
                    <div className="flex items-center justify-center gap-2">
                        <SelfImprovementIcon/>
                        <p className="font-bold text-xl">Add Room</p>
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
                    <Link to="/recreations" className="flex items-center justify-center gap-2">
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
                <TableContainer className="p-2 rounded">
                    <Table className="hover:table-auto -ml-3">
                        <TableHead className="bg-gray-100">
                            <TableRow className="py-2 text-lg font-bold bg-pink-300">
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">No.</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Illustration</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Activity</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Number</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Capacity</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Caption</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Attendant</h4></TableCell>
                                <TableCell><h4 className="font-semibold text-base font-sans text-center">Action</h4></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="py-2 bg-white">
                                {Rooms.map((row) => (
                                    <TableRow 
                                            className="py-2"
                                            key={row.ID}
                                        >
                                            <TableCell align="center">{row.ID}</TableCell>
                                            <TableCell align="center"><img src={`${row.Illustration}`} width="250" height="150" /></TableCell>
                                            <TableCell align="center">{row.Activity}</TableCell>
                                            <TableCell align="center">{row.Number}</TableCell>
                                            <TableCell align="center">{row.Capacity}</TableCell>
                                            <TableCell align="center">{row.Caption}</TableCell>
                                            <TableCell align="center">{row.Attendant}</TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup>
                                                    <Button
                                                    startIcon={<EditIcon />}
                                                    className="hover:bg-blue-500 cursor-pointer"
                                                    onClick={() =>
                                                        navigate({ pathname: `/room/update/${row.ID}` })
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
                            If you delete this room then you won't be able to recover any more. 
                            Do you want to delete this room?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color= "error" onClick={handleDialogDeleteclose}>Cancel</Button>
                        <Button color= "secondary" onClick={handleDelete} className="bg-red-500" autoFocus>
                          Confirm
                        </Button>
                    </DialogActions>
            </Dialog>

            {/* Create New Recreation Room */}
            { showRoomCreate && <RoomCreate onClose={handleOnClose}/>}
        </section>
    )
}
export default RoomManagement;