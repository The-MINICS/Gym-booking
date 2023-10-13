import React from "react";
import BookingIcon1 from "@/assets/booking1.png";
import BookingIcon2 from "@/assets/booking2.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ListIcon from '@mui/icons-material/List';
import { BookingInterface } from "@/interfaces/IBooking";
import { EquipmentBookingInterface } from "@/interfaces/IEquipmentBooking";
import { BookDelete, EquipmentBookDelete, GetBooks, GetEquipmentBookings, GetMembers, GetSlot } from "@/services/HttpClientService";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText,
        DialogTitle, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import dayjs from "dayjs";
import { TransitionProps } from "@mui/material/transitions";
import CancelIcon from '@mui/icons-material/Cancel';
import { MemberInterface } from "@/interfaces/IMember";

function BookingManagement() {
    const [Bookings, setBookings] = useState<BookingInterface[]>([]);
    const [Members, setMembers] = useState<MemberInterface[]>([]);
    const [EquipmentBookings, setEquipmentBookings] = useState<EquipmentBookingInterface[]>([]);
    const [holdStateRoomBookingList, setHoldStateRoomBookingList] = useState(true);
    const [holdStateEquipmentBookingList, setHoldStateEquipmentBookingList] = useState(false);
    const [deleteBookingID, setDeleteBookingID] = useState<number>(0);
    const [openBookingDelete, setOpenBookingDelete] = useState(false);
    const [deleteEquipmentBookingID, setDeleteEquipmentBookingID] = useState<number>(0);
    const [openEquipmentBookingDelete, setOpenEquipmentBookingDelete] = useState(false);

    const Noholdstate = `bg-slate-100 rounded p-2 hover:bg-yellow-500
    active:scale-[.98] active:duration-75 transition-all`
    const Holdstate = `bg-yellow-500 rounded p-2`

    const getBooks = async () => {
        let res = await GetBooks();
        if (res) {
            setBookings(res);
      }
    };

    const getEquipmentBooks = async () => {
        let res = await GetEquipmentBookings();
        if (res) {
            setEquipmentBookings(res);
      }
    };

    const getMembers = async () => {
        let res = await GetMembers();
        if (res) {
            setMembers(res);
        }
    };

    const EquipmentBookingHandler = () => {
        setHoldStateEquipmentBookingList(true);
        setHoldStateRoomBookingList(false);
    }

    const RoomBookingHandler = () => {
        setHoldStateEquipmentBookingList(false);
        setHoldStateRoomBookingList(true);
    }

    const handleDialogBookingDeleteOpen = (ID: number) => {
        setDeleteBookingID(ID)
        setOpenBookingDelete(true)
    }

    const handleDialogBookingDeleteclose = () => {
        setOpenBookingDelete(false)
        setTimeout(() => {
            setDeleteBookingID(0)
        }, 500)
    }

    const handleBookingDelete = async () => {
        let res = await BookDelete(deleteBookingID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        setOpenBookingDelete(false)
        setTimeout(() => {
          window.location.href = "/booking-management";
        }, 1000);
    }

    const handleDialogEquipmentBookingDeleteOpen = (ID: number) => {
        setDeleteEquipmentBookingID(ID)
        setOpenEquipmentBookingDelete(true)
    }

    const handleDialogEquipmentBookingDeleteclose = () => {
        setOpenEquipmentBookingDelete(false)
        setTimeout(() => {
            setDeleteEquipmentBookingID(0)
        }, 500)
    }

    const handleEquipmentBookingDelete = async () => {
        let res = await EquipmentBookDelete(deleteEquipmentBookingID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        setOpenEquipmentBookingDelete(false)
        setTimeout(() => {
          window.location.href = "/booking-management";
        }, 1000);
    }

    useEffect(() => {
        getBooks();
        getEquipmentBooks();
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
                            <img src={BookingIcon1} className="h-16 w-16"/>
                            <h1 className="text-red-500 font-bold text-6xl">Booking Management</h1>
                            <img src={BookingIcon2} className="h-16 w-16"/>
                        </div>
                    </motion.div>
            </motion.div>

            {/* Tool Option */}
            <motion.div
                className="flex items-center justify-center mb-2 gap-3"
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
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-green-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all">
                    <Link to="/bookings" className="flex items-center justify-center gap-2">
                        <PhoneIphoneIcon/>
                        <p className="font-bold text-xl">View Page</p>
                    </Link>
                </button>
            </motion.div>

            <motion.div
                className="flex items-center justify-center mb-3 gap-2"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
            >
                <button onClick={() => RoomBookingHandler()}
                    className= {holdStateRoomBookingList ? `${Holdstate}` : `${Noholdstate}`}
                >
                    <div className="flex items-center justify-center gap-1">
                        <ListIcon/>
                        <p className="font-bold text-xl">Room Booking List</p>
                    </div>
                </button>
                <button onClick={() => EquipmentBookingHandler()}
                    className= {holdStateEquipmentBookingList ? `${Holdstate}` : `${Noholdstate}`}
                >
                    <div className="flex items-center justify-center gap-1">
                        <ListIcon/>
                        <p className="font-bold text-xl">Equipment Booking List</p>
                    </div>
                </button>
            </motion.div>

            {/* Room Booking Management */}
            {holdStateRoomBookingList && (
                <div className="mx-auto md:w-4/5 md:bg-center mt-2 py-2 rounded mb-5 bg-center">
                    <TableContainer className="mx-auto md:w-4/5 md:bg-center ml-2">
                        <Table className="hover:table-auto -ml-3">
                            <TableHead className="bg-gray-100">
                                <TableRow className="py-2 text-lg font-bold bg-pink-300">
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">No.</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Activity</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Room</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Attendant</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Date</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">TimeSlot</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Member</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Leave Note</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Status</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Action</h4></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="py-2 bg-white">
                                    {Bookings.map((row) => (
                                        <TableRow 
                                                className={(row.StatusID === 3) ? "py-2 bg-green-200" : "py-2 bg-slate-100"}
                                                key={row.ID}
                                            >
                                                <TableCell align="center">{row.ID}</TableCell>
                                                <TableCell align="center">{row.Room?.Activity}</TableCell>
                                                <TableCell align="center">{row.Room?.Number}</TableCell>
                                                <TableCell align="center">{row.Room?.Attendant}</TableCell>
                                                <TableCell align="center">{dayjs(row.Datetime).format('YYYY-MM-DD')}</TableCell>
                                                <TableCell align="center">{row.Timeslot?.Slot}</TableCell>
                                                <TableCell align="center">{row.Member?.Firstname} {row.Member?.Lastname}</TableCell>
                                                <TableCell align="center">{row.Note}</TableCell>
                                                <TableCell align="center">{row.Status?.State}</TableCell>
                                                <TableCell align="center">
                                                    <ButtonGroup>
                                                        {(row.StatusID === 4) ? ("") : (
                                                            <Button
                                                                startIcon={<CancelIcon />}
                                                                className="hover:bg-red-500 cursor-pointer"
                                                                color="error"
                                                                onClick={() => { handleDialogBookingDeleteOpen(Number(row.ID)) }}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        )}
                                                    </ButtonGroup>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {/* Equipment Booking Management */}
            {holdStateEquipmentBookingList && (
                <div className="mx-auto md:w-4/5 md:bg-center bg-slate-50 mt-2 py-2 rounded mb-5 bg-center">
                    <TableContainer className="mx-auto md:w-4/5 md:bg-center ml-2">
                        <Table className="hover:table-auto -ml-3">
                            <TableHead className="bg-gray-100">
                                <TableRow className="py-2 text-lg font-bold bg-pink-300">
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">No.</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Equipment Name</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Date</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Room TimeSlot</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Equipment TimeSlot</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Member</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Leave Note</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Status</h4></TableCell>
                                    <TableCell><h4 className="font-semibold text-base font-sans text-center">Action</h4></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="py-2 bg-white">
                                    {EquipmentBookings.map((row) => (
                                        <TableRow 
                                                className={(row.StatusID === 3) ? "py-2 bg-green-200" : "py-2 bg-slate-100"}
                                                key={row.ID}
                                            >
                                                <TableCell align="center">{row.ID}</TableCell>
                                                <TableCell align="center">{row.Equipment?.Name}</TableCell>
                                                <TableCell align="center">{dayjs(row.EquipmentDatetime).format('YYYY-MM-DD')}</TableCell>
                                                <TableCell align="center">
                                                    {Bookings.filter((items: BookingInterface) => (items.TimeslotID) === row.Booking?.TimeslotID)
                                                        .map((items) => (
                                                            <p>{items.Timeslot?.Slot}</p>
                                                        ))
                                                    }
                                                </TableCell>
                                                <TableCell align="center">{row.EquipmentTimeslot?.Equipmentslot}</TableCell>
                                                <TableCell align="center">
                                                    {Members.filter((items) => (items.ID) === row.Booking?.MemberID)
                                                        .map((items) => (
                                                            <p>{items.Firstname} {items.Lastname}</p>
                                                        ))
                                                    }
                                                </TableCell>
                                                <TableCell align="center">{row.EquipmentNote}</TableCell>
                                                <TableCell align="center">{row.Status?.State}</TableCell>
                                                <TableCell align="center">
                                                    <ButtonGroup>
                                                        {(row.StatusID === 4) ? ("") : (
                                                            <Button
                                                                startIcon={<CancelIcon />}
                                                                className="hover:bg-red-500 cursor-pointer"
                                                                color="error"
                                                                onClick={() => { handleDialogEquipmentBookingDeleteOpen(Number(row.ID)) }}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        )}
                                                    </ButtonGroup>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {/* BookingDialogOpen */}
            <Dialog
                open={openBookingDelete}
                onClose={handleDialogBookingDeleteclose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Would you like to delete this booking?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color= "error" onClick={handleDialogBookingDeleteclose}>Cancel</Button>
                        <Button color= "secondary" onClick={handleBookingDelete} className="bg-red-500" autoFocus>
                          Confirm
                        </Button>
                    </DialogActions>
            </Dialog>

            {/* EquipmentBookingDialogOpen */}
            <Dialog
                open={openEquipmentBookingDelete}
                onClose={handleDialogEquipmentBookingDeleteclose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Would you like to delete this Equipment booking?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color= "error" onClick={handleDialogEquipmentBookingDeleteclose}>Cancel</Button>
                        <Button color= "secondary" onClick={handleEquipmentBookingDelete} className="bg-red-500" autoFocus>
                          Confirm
                        </Button>
                    </DialogActions>
            </Dialog>
        </section>
    )
}
export default BookingManagement;