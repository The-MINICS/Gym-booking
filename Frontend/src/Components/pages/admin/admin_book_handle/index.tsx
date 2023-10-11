import React from "react";
import BookingIcon1 from "@/assets/booking1.png";
import BookingIcon2 from "@/assets/booking2.png";
import { motion } from "framer-motion";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ListIcon from '@mui/icons-material/List';
import { BookingInterface } from "@/interfaces/IBooking";
import { EquipmentBookingInterface } from "@/interfaces/IEquipmentBooking";
import { BookDelete, EquipmentBookDelete, GetBooks, GetDates, GetEquipmentBookings, GetMembers, GetRooms, GetSlot } from "@/services/HttpClientService";
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, Divider,
        DialogTitle, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Snackbar, Alert, SelectChangeEvent, Select 
} from "@mui/material";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { TransitionProps } from "@mui/material/transitions";
import CancelIcon from '@mui/icons-material/Cancel';
import { RoomInterface } from "@/interfaces/IRoom";
import { DateInterface } from "@/interfaces/IDate";
import { MemberInterface } from "@/interfaces/IMember";
import { TimeslotInterface } from "@/interfaces/ITimeslot";

function BookingManagement() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<BookingInterface>({});
    const [Bookings, setBookings] = useState<BookingInterface[]>([]);
    const [members, setMembers] = useState<MemberInterface[]>([]);
    const [rooms, setRooms] = useState<RoomInterface[]>([]);
    const [dates, setDates] = useState<DateInterface[]>([]);
    const [slot, setSlot] = useState<TimeslotInterface[]>([]);
    const [EquipmentBookings, setEquipmentBookings] = useState<EquipmentBookingInterface[]>([]);
    const [roomState, setRoomState] = useState('');
    const [selectedDate, setSelectedDate] = useState("");
    const [openRoomBookingCreate, setOpenRoomBookingCreate] = useState(false);
    const [openEquipmentBookingCreate, setOpenEquipmentBookingCreate] = useState(false);
    const [holdStateRoomBookingList, setHoldStateRoomBookingList] = useState(true);
    const [holdStateEquipmentBookingList, setHoldStateEquipmentBookingList] = useState(false);
    const [deleteBookingID, setDeleteBookingID] = useState<number>(0);
    const [openBookingDelete, setOpenBookingDelete] = useState(false);
    const [deleteEquipmentBookingID, setDeleteEquipmentBookingID] = useState<number>(0);
    const [openEquipmentBookingDelete, setOpenEquipmentBookingDelete] = useState(false);
    const [dialogWidth, setDialogWidth] = useState<number | string>('auto');
    const dialogContentRef = React.createRef<HTMLDivElement>();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const Noholdstate = `bg-slate-100 rounded p-2 hover:bg-yellow-500
    active:scale-[.98] active:duration-75 transition-all`
    const Holdstate = `bg-yellow-500 rounded p-2`

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof BookingManagement;
        const { value } = event.target;
        setBooks({ ...books, [id]: value });
    };

    const handleBookingTime = (Time: any) => {
        setSelectedDate(Time);
    }

    const handleRoomChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const roomState = event.target.value;
        books.RoomID = convertType(roomState);
        setRoomState(roomState);
    }

    const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const roomDate = event.target.value;
        books.DateID = convertType(roomDate);
    }

    const handleMemberChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const member = event.target.value;
        books.MemberID = convertType(member)
    }

    const handleTimeSlotChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const timeSlot = event.target.value;
        books.TimeslotID = convertType(timeSlot);
    }

    const getBooks = async () => {
        let res = await GetBooks();
        if (res) {
            setBookings(res);
      }
    };

    const getMembers = async () => {
        let res = await GetMembers();
        if (res) {
            setMembers(res);
      }
    };

    const getRooms = async () => {
        let res = await GetRooms();
        if (res) {
            setRooms(res);
        }
    };

    const getEquipmentBooks = async () => {
        let res = await GetEquipmentBookings();
        if (res) {
            setEquipmentBookings(res);
      }
    };

    const getDate = async () => {
        let res = await GetDates();
        if (res) {
            setDates(res);
      }
    };

    const getSlots = async () => {
        let res = await GetSlot();
        if (res) {
            setSlot(res);
        }
    };

    const handleDialogBookingOpen = () => {
        setOpenRoomBookingCreate(false);
        const contentWidth = dialogContentRef.current?.scrollWidth;
        if (contentWidth) {
            setDialogWidth(contentWidth);
        }
        setOpenRoomBookingCreate(true);
    }

    const handleDialogBookingClose = () => {
        setOpenRoomBookingCreate(false);
    }

    const handleDialogEquipmentBookingOpen = () => {
        setOpenEquipmentBookingCreate(false);
        const contentWidth = dialogContentRef.current?.scrollWidth;
        if (contentWidth) {
            setDialogWidth(contentWidth);
        }
        setOpenEquipmentBookingCreate(true);
    }

    const handleDialogEquipmentBookingClose = () => {
        setOpenEquipmentBookingCreate(false);
    }

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

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    useEffect(() => {
        getBooks();
        getMembers();
        getEquipmentBooks();
        getRooms();
        getDate();
        getSlots();
    }, []);

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
          children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>,
      ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    async function Submit() {
        let data = {
            Note: books.Note?? "",
            Datetime: new Date(selectedDate),
            RoomID: convertType(books.RoomID),
            MemberID: convertType(books.MemberID),
            TimeslotID: convertType(books.TimeslotID),
            DateID: convertType(books.DateID),
            StatusID: convertType(books.StatusID = 3)
        };
        console.log(data)
        const apiUrl = "http://localhost:9999";

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        };
      
        fetch(`${apiUrl}/bookings`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
              console.log("seved")
              setSuccess(true);
              setErrorMessage("")
              setTimeout(() => {
                window.location.href = "/booking-management";
            }, 1000);
            } else {
              console.log("save failured!")
              setError(true);
              setErrorMessage(res.error)
            }
        });
    }
    
    return(
        <section className="w-full bg-gray-50 py-10">
            <div className="mx-auto w-5/6">
                <Snackbar
                    id="success"
                    open={success}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleClose} severity="success">
                        You have booked the room
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
            </div>
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
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-orange-500
                hover:text-white active:scale-[.98] active:duration-75 transition-all"
                    onClick={() => handleDialogBookingOpen()}
                >
                    <div className="flex items-center justify-center gap-2">
                        <BookOnlineIcon/>
                        <p className="font-bold text-xl">Book Room</p>
                    </div>
                </button>
                <button className="bg-slate-300 rounded-xl px-5 py-3 hover:bg-orange-800
                hover:text-white active:scale-[.98] active:duration-75 transition-all"
                    onClick={() => handleDialogEquipmentBookingOpen()}
                >
                    <div className="flex items-center justify-center gap-2">
                        <FitnessCenterIcon/>
                        <p className="font-bold text-xl">Book Equipment</p>
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
                                                        <Button
                                                            className="hover:bg-blue-500 cursor-pointer"
                                                            onClick={() =>
                                                                navigate({ pathname: `/room/update/${row.ID}` })
                                                        }
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                        <Button
                                                            className="hover:bg-red-500 cursor-pointer"
                                                            color="error"
                                                            onClick={() => { handleDialogBookingDeleteOpen(Number(row.ID)) }}
                                                        >
                                                            <CancelIcon/>
                                                        </Button>
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
                                                <TableCell align="center">{row.Booking?.TimeslotID}</TableCell>
                                                <TableCell align="center">{row.EquipmentTimeslot?.Equipmentslot}</TableCell>
                                                <TableCell align="center">{row.Booking?.MemberID}</TableCell>
                                                <TableCell align="center">{row.EquipmentNote}</TableCell>
                                                <TableCell align="center">{row.Status?.State}</TableCell>
                                                <TableCell align="center">
                                                    <ButtonGroup>
                                                        <Button
                                                            className="hover:bg-blue-500 cursor-pointer"
                                                            onClick={() =>
                                                                navigate({ pathname: `/room/update/${row.ID}` })
                                                            }
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                        <Button
                                                            className="hover:bg-red-500 cursor-pointer"
                                                            color="error"
                                                            onClick={() => { handleDialogEquipmentBookingDeleteOpen(Number(row.ID)) }}
                                                        >
                                                            <CancelIcon/>
                                                        </Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {/* Show Booking Dialog */}
            {openRoomBookingCreate && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
                    <dialog
                        open={openRoomBookingCreate}
                        onClose={handleDialogBookingClose}
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
                            {/* Header */}
                            <div className="flex items-center justify-center mb-3">
                                <h1 className="font-bold text-purple-600 text-4xl">Room Booking for</h1>
                                <h1 className="font-bold text-orange-600 text-4xl">Admin</h1>
                            </div>
                            <Divider/>
                            {/* Body */}
                            <div className="my-3">
                                <Grid container sx={{ padding: 1 }}>
                                    <Grid item xs={5.78} marginX={1}>
                                        <h1 className="font-bold">All Services and Activities:</h1>
                                        <div className="mb-3">
                                            <select
                                                className="w-full h-full rounded p-1 font-medium cursor-pointer bg-slate-100"
                                                onChange={handleRoomChange}
                                                value={books.RoomID + ""}
                                                >
                                                <option>Select the activities</option>
                                                {rooms.map((item: RoomInterface) => (
                                                    <option value={item.ID} key={item.ID}>
                                                        {item.Activity}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </Grid>
                                    <Grid item xs={5.78} marginX={1}>
                                        <h1 className="font-bold">Book For The Date:</h1>
                                        <div className="mb-3">
                                            <select
                                                className="w-full h-full rounded p-1 font-medium cursor-pointer bg-slate-100"
                                                value={books.DateID + ""}
                                                onChange={handleDateChange}
                                                >
                                                <option>Select the date</option>
                                                {dates.filter((item: DateInterface) => (item.RoomID) === convertType(roomState))
                                                    .map((item) => (
                                                        <option value={item.ID} key={item.ID} 
                                                            onClick={() => handleBookingTime(dayjs(item.DateCode).format('YYYY-MM-DD'))}>
                                                            {dayjs(item.DateCode).format('YYYY-MM-DD')}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </Grid>
                                    <Grid item xs={5.78} marginX={1}>
                                        <h1 className="font-bold">TimeSlot:</h1>
                                        <div className="mb-3">
                                            <select
                                                className="w-full h-full rounded p-1 font-medium cursor-pointer bg-slate-100"
                                                onChange={handleTimeSlotChange}
                                                >
                                                <option>Select the TimeSlot</option>
                                                {slot.filter((timeslot: TimeslotInterface) => ((timeslot.RoomID) === books.RoomID) && ((timeslot.DateID) === books.DateID))
                                                    .map((timeslot) => (
                                                        <option value={timeslot.ID} key={timeslot.ID}>
                                                            {timeslot.Slot} (Amount: {timeslot.Quantity})
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </Grid>
                                    <Grid item xs={5.78} marginX={1}>
                                        <h1 className="font-bold">Member:</h1>
                                        <div className="mb-3">
                                            <select
                                                className="w-full h-full rounded p-1 font-medium cursor-pointer bg-slate-100"
                                                value={books.MemberID + ""}
                                                onChange={handleMemberChange}
                                                >
                                                <option>Select the Members</option>
                                                {members.map((item) => (
                                                    <option value={item.ID} key={item.ID}>
                                                        ({item.Username}) {item.Firstname} {item.Lastname}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} marginX={1}>
                                        <div className="my-2">
                                            <div className="flex justify-start items-center gap-2">
                                                <p className="text-lg font-semibold">Leave Note</p>
                                                <p className="text-red-500 italic">(Limit: 50 characters)</p>
                                            </div>
                                            <textarea
                                                className="mb-3 w-full rounded-lg px-5 py-3 bg-slate-50 font-medium text-red-950"
                                                autoFocus
                                                defaultValue={"Booked by Admin"}
                                                placeholder="Leave Note Message"
                                                id="Note"
                                                name="note"
                                                rows={4}
                                                cols={50}
                                                value={books.Note || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            {/* Submit button */}
                            <Divider/>
                            <div className="flex justify-center items-center gap-3 my-3">
                                <button className="rounded px-2 py-1 bg-red-600 text-white active:scale-[.98] active:duration-75 transition-all" 
                                    onClick={handleDialogBookingClose}
                                >
                                    <CancelIcon/> Cancel
                                </button>
                                <button className="rounded px-2 py-1 text-white font-semibold
                                    bg-green-500 active:scale-[.98] active:duration-75 transition-all" 
                                    onClick={Submit}
                                >
                                    <AssignmentTurnedInIcon/> Book Now
                                </button>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}

            {/* Show Equipment Booking Dialog */}
            {openEquipmentBookingCreate && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
                    <dialog
                        open={openEquipmentBookingCreate}
                        onClose={handleDialogEquipmentBookingClose}
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
                            <p>Show Equipment Booking Create by Admin</p>
                        </div>
                    </dialog>
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
                            If you delete this book then you won't be able to recover any more. 
                            Do you want to delete this book?
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
                            If you delete this book then you won't be able to recover any more. 
                            Do you want to delete this book?
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