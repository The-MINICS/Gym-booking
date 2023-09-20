import React from "react";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import equipmentPhoto from "@/assets/equipments.png";
import { 
        Dialog, DialogActions, DialogContent, DialogContentText,  
        DialogTitle, Divider, FormControl, Grid, Paper, Select, 
        SelectChangeEvent, Button,
        Table,  TableBody,  TableCell,  TableContainer, TableHead,  TableRow,
} from "@mui/material";
import { RoomInterface } from "@/interfaces/IRoom";
import { useEffect, useState } from "react";
import { BookingInterface } from "@/interfaces/IBooking";
import { MemberInterface } from "@/interfaces/IMember";
import { BookDelete, GetBooks, GetMemberByMID, GetSlot } from "@/services/HttpClientService";
import { TimeslotInterface } from "@/interfaces/ITimeslot";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Snackbar from "@mui/material/Snackbar";
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function Booking() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<BookingInterface>({});
    const [book, setBook] = useState<BookingInterface[]>([]);
    const [rooms, setRooms] = useState<RoomInterface[]>([]);
    const [slot, setSlot] = useState<TimeslotInterface[]>([]);
    const [members, setMembers] = useState<MemberInterface>();
    const [roomState, setRoomState] = useState("");
    const [TimeSlotState, setTimeSlotState] = useState("");
    const [deleteID, setDeleteID] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);
    const [openBooking, setOpenBooking] = useState(false);
    const [openBookerList, setOpenBookerList] = useState(false);
    const [dialogWidth, setDialogWidth] = useState<number | string>('auto');
    const dialogContentRef = React.createRef<HTMLDivElement>();
    const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
    const [showButton, setShowButton] = useState<boolean>(false);
    const [buttonTime, setButtonTime] = useState("");
    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const apiUrl = "http://localhost:9999";

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof books;
        const roomState = event.target.value;
        setBooks({
          ...books,
          [name]: event.target.value,
        });
        setRoomState(roomState);
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof Booking;
        const { value } = event.target;
        setBooks({ ...books, [id]: value });
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
        let res = await BookDelete(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getRooms();
        setOpenDelete(false)
        setTimeout(() => {
          window.location.href = "/bookings";
        }, 500);
    }

    const handleDialogBookingOpen = (value: any) => {
        setOpenBooking(false);
        const contentWidth = dialogContentRef.current?.scrollWidth;
        if (contentWidth) {
            setDialogWidth(contentWidth);
        }
        setOpenBooking(true);
        setTimeSlotState(value);
        console.log(value);
    }

    const handleDialogBookingClose = () => {
        setOpenBooking(false)
    }

    const BookerListOpen = (value: any) => {
        setOpenBookerList(false);
        const contentWidth = dialogContentRef.current?.scrollWidth;
        if (contentWidth) {
            setDialogWidth(contentWidth);
        }
        setOpenBookerList(true);
        setTimeSlotState(value);
    }

    const BookerListClose = () => {
        setOpenBookerList(false)
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

    const checkTime = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
    
        // Check if the current time is between 8:00 AM and 7:30 PM
        if (currentHour >= 8 && currentHour < 12) {
            const isBetween8AMand12PM = (currentHour >= 8 && currentHour < 12);
            setButtonTime("8:00 - 12:00");
            setShowButton(isBetween8AMand12PM);
        }
        if (currentHour >= 13 && currentHour < 16) {
            const isBetween1PMand4PM = (currentHour >= 13 && currentHour < 16);
            setButtonTime("13:00 - 16:00");
            setShowButton(isBetween1PMand4PM);
        }
        if ((currentHour === 16 && currentMinutes >= 0) || 
            (currentHour > 16 && currentHour < 19) ||
            (currentHour === 19 && currentMinutes <= 30)) 
            {
            const isBetween4PMand730PM = 
                (currentHour === 16 && currentMinutes >= 0) ||
                (currentHour > 16 && currentHour < 19) ||
                (currentHour === 19 && currentMinutes <= 30);
            setButtonTime("16:30 - 19:30");
            setShowButton(isBetween4PMand730PM);
        }
    };

    async function GetRooms() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/rooms`, requestOptions)
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
        books.MemberID = res.ID;
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

    const getSlots = async () => {
        let res = await GetSlot();
        if (res) {
            setSlot(res);
        }
    };

    const getBook = async () => {
        let res = await GetBooks();
        if (res) {
            setBook(res);
      }
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    useEffect(() => {
        getMembers();
        getRooms();
        getSlots();
        getBook();
        checkTime();
        //CurrentDateTime
        const intervalId = setInterval(() => {
            checkTime();
            setCurrentDateTime(new Date());
        }, 500);
        return () => clearInterval(intervalId);
    }, []);

    async function Submit() {
        let data = {
            Note: books.Note?? "",
            RoomID: convertType(books.RoomID),
            MemberID: convertType(books.MemberID),
            TimeslotID: convertType(books.TimeslotID),
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
                window.location.href = "/bookings";
            }, 1000);
            } else {
              console.log("save failured!")
              setError(true);
              setErrorMessage(res.error)
            }
        });
    }

    const BookerList = () => {
        for (let i = 1; i <= rooms.length; i++) {
            for (let j = 1; j <= slot.length; j++) {
                if (books.RoomID === i && books.TimeslotID === j) {
                    return (
                        <TableBody className="py-2 bg-white">
                            {book.filter((rows: BookingInterface) => (rows.RoomID === i) && (rows.TimeslotID === j))
                                .map((rows) => (
                                    <TableRow className="py-2 hover:bg-yellow-100 cursor-pointer">
                                        <TableCell align="center">{rows.Member?.Username}</TableCell>
                                        <TableCell align="center">{rows.Member?.Firstname} {rows.Member?.Lastname}</TableCell>
                                        <TableCell align="center">{rows.Note}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    )
                }
            }
        }
    }

    return (
    <section>
    <div className="w-full">
        <motion.div className="mx-auto w-5/6 pt-10 pb-5 bg-center">
            {/* Header */}
            <motion.div
                className="justify-center items-center text-center"
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
                    <span className="text-red-500">Room Booking</span>
                </HText>
                <p className="mt-5">
                Are you tired of the hassle that comes with managing reservations and appointments? 
                Look no further! Our Booking System is designed to streamline your reservation processes, 
                enhance customer satisfaction, and boost your business's efficiency.
                </p>
            </motion.div>

            {/* Services */}
            <motion.div
            className="bg-slate-50 rounded-xl my-5 text-center pb-5"
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
                hidden: { opacity: 0, x:-50 },
                visible: { opacity: 1, x:-0 }
            }}
            >
                <div className="px-3">
                    <Grid container sx={{ padding: 1 }} columnSpacing={5}>
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
                        {/* Left hand side */}
                        <Grid item xs={6}>
                            <div className="justify-center items-center text-center my-3">
                                <h1 className="font-bold text-xl text-purple-700 mb-3">
                                    Service Schedule
                                </h1>
                                <Divider/>
                            </div>
                            <div className="text-left mb-3">
                                <h1 className="font-semibold text-lg">
                                    All Services
                                </h1>
                            </div>
                            <div className="mb-3">
                                <FormControl fullWidth variant="standard">
                                    <Select className="bg-pink-50 p-2"
                                        native
                                        value={books.RoomID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "RoomID",
                                        }}>
                                        <option aria-label="None" value="">Service Rooms</option>
                                        {rooms.map((item: RoomInterface) => (
                                            <option value={item.ID} key={item.ID}>
                                                {item.Number} ({item.Activity})
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="text-left mb-1">
                                <h1 className="font-bold text-base">
                                    Booking Schedule
                                </h1>
                            </div>
                            <div className="text-left">
                                {AfterSelect()}
                            </div>
                        </Grid>
                        {/* Right hand side */}
                        <Grid item xs={6}>
                            {/* Header */}
                            <div className="justify-center items-center text-center my-3">
                                <h1 className="font-bold text-xl text-orange-700 mb-3">
                                    My Bookings
                                </h1>
                                <Divider/>
                            </div>
                            <div className="text-left mb-1">
                                <div className="flex items-center justify-start gap-2">
                                    <h1 className="font-semibold text-lg">
                                        Service List:
                                    </h1>
                                    <h1 className="font-semibold text-base text-black">
                                        {members?.Firstname} {members?.Lastname}
                                    </h1>
                                </div>
                                <div className="flex items-center justify-start gap-2">
                                    <h1 className="font-semibold">Date:</h1>
                                    <p className="text-red-500">{currentDateTime.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Booking Schedule */}
                            <motion.div 
                                className="text-left mb-3"
                                initial="hidden" 
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <div>
                                    <section>
                                        {book.filter((booking:BookingInterface) => (booking.MemberID) === members?.ID)
                                            .map((booking) => (
                                                <>
                                                <Grid container className="bg-pink-100 my-2 px-2 py-2 rounded-lg mx-auto">
                                                    <Grid item xs={9}>
                                                        <ul className="px-2">
                                                            <li><span className="font-semibold">Room: </span>{booking.Room?.Activity}</li>
                                                            <li><span className="font-semibold">Period: </span>{booking.Timeslot?.Slot}</li>
                                                            <li><span className="font-semibold">Booking Date: </span>
                                                                {dayjs(booking.Datetime).format('YYYY-MM-DD HH:mm')}
                                                            </li>
                                                            <li className="text-green-700"><span className="font-semibold">Leave Note: </span>{booking.Note}</li>
                                                        </ul> 
                                                    </Grid>
                                                    <Grid item xs={3} style={{ textAlign: "right" }}>
                                                        <button className="cursor-pointer active:scale-[.98] active:duration-75 transition-all mb-2"
                                                            onClick={() => { handleDialogDeleteOpen(Number(booking.ID)) }}
                                                        >
                                                            <CancelIcon/>
                                                        </button>
                                                    </Grid>
                                                </Grid>
                                                <div className="text-right">
                                                    {(booking.Room?.ID === 5 && booking.Room.Activity === "fitness") ? (
                                                        <>
                                                            <p className="text-red-500 italic my-2 text-sm">
                                                                According to your room booking, You have booked a fitness room,
                                                                For the convenience of using the room and equipment,
                                                                Please click on the "Equipment Booking" button to continue booking equipment in the fitness room.
                                                            </p>
                                                            <button className="cursor-pointer text-white bg-green-500 rounded-lg py-2 px-2 mb-4
                                                                active:scale-[.98] active:duration-75 transition-all font-bold hover:bg-yellow-500"
                                                                onClick={() =>
                                                                    navigate({ pathname: `/equipmentbooking/update/${booking.ID}` })
                                                                }
                                                                >
                                                                    <div className="flex items-center justify-center gap-1">
                                                                        <img src={equipmentPhoto} alt="equipment-booking-icon" className="w-auto h-8"/>
                                                                        <p>Equipment Booking ...</p>
                                                                    </div>
                                                            </button>
                                                        </>
                                                        ) : ("")
                                                    }
                                                </div>
                                                
                                                </>
                                            ))
                                        }
                                    </section>
                                </div>
                            </motion.div>
                        </Grid>
                    </Grid>
                </div>
            </motion.div>
        </motion.div>

        {/* Delete Dialog */}
        <Dialog
            open={openDelete}
            onClose={handleDialogDeleteclose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                Ticket Delete
            </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you delete this ticket then you won't be able to recover any more. 
                        Do you want to delete this ticket?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color= "error" onClick={handleDialogDeleteclose}>Cancel</Button>
                    <Button color= "secondary" onClick={handleDelete} className="bg-red-500" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
        </Dialog>

        {/* Booking Dialog */}
        { openBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
                <dialog
                    open={openBooking}
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
                        <div>
                            <h1 className="text-center font-bold text-purple-800 font-monserrat text-2xl mb-3">
                                Let's book now and workout with us
                            </h1>
                            <Divider/>
                        </div>
                        <div className="my-3">
                            <>
                                {rooms.filter((rooms:RoomInterface) => (rooms.ID) === books.RoomID)
                                    .map((rooms) => (
                                        <h1 className="text-orange-600 font-medium text-lg text-center">{rooms.Number} {rooms.Activity} room booking</h1>
                                    ))
                                }
                                <div className="flex items-center justify-start gap-2 my-2">
                                    <h1 className="font-semibold">Date:</h1>
                                    <p className="font-medium text-red-950">{currentDateTime.toLocaleString()}</p>
                                </div>
                                {slot.filter((timeslot: TimeslotInterface) => (timeslot.ID) === books.TimeslotID)
                                    .map((timeslot) => (
                                        <div className="flex items-center justify-start gap-2 my-2">
                                            <h1 className="font-semibold">TimeSlot:</h1>
                                            <p className="font-medium text-red-950">{timeslot.Slot}</p>
                                        </div>
                                    ))
                                }
                                <div className="flex justify-start items-center gap-2 my-2">
                                    <p className="text-lg font-semibold">Booker: </p>
                                    <Select
                                        disabled
                                        native
                                        value={books.MemberID + ""}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "MemberID",
                                        }}>
                                        <option value={members?.ID} key={members?.ID}>
                                            {members?.Firstname} {members?.Lastname}
                                        </option> 
                                    </Select>
                                </div>
                                <div className="my-2">
                                    <div className="flex justify-start items-center gap-2">
                                        <p className="text-lg font-semibold">Leave Note</p>
                                        <p className="text-red-500 italic">(Limit: 50 characters)</p>
                                    </div>
                                    <textarea
                                        className="mb-3 w-full rounded-lg px-5 py-3 bg-slate-50 font-medium text-red-950"
                                        autoFocus
                                        placeholder="Leave Note Message"
                                        id="Note"
                                        name="note"
                                        rows={4}
                                        cols={50}
                                        value={books.Note || ""}
                                        onChange={handleInputChange}
                                    />
                                </div> 
                            </>
                        </div>
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

        {/* Show booker list */}
        { openBookerList && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
            <dialog
                open={openBookerList}
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
                    <h1 className="text-center font-bold text-purple-800 font-monserrat text-2xl mb-3">
                        List of Bookers
                    </h1>
                    <Divider/>

                    {/* Table List */}
                    <div className="my-3">
                        <TableContainer sx={{ maxHeight: 640 }}>
                            <Table className="hover:table-auto -ml-3" aria-label="sticky table">
                                <TableHead>
                                    <TableRow className="py-2 text-lg font-bold bg-pink-200">
                                        <TableCell><h4 className="font-semibold text-base font-sans text-center">UserID</h4></TableCell>
                                        <TableCell><h4 className="font-semibold text-base font-sans text-center">Full-Name</h4></TableCell>
                                        <TableCell><h4 className="font-semibold text-base font-sans text-center">Note</h4></TableCell>
                                    </TableRow>
                                </TableHead>
                                {BookerList()}
                            </Table>
                        </TableContainer>
                    </div>
                    <Divider />
                    <div className="flex justify-center items-center gap-3 my-3">
                        <button className="rounded px-4 py-2 bg-red-600 text-white active:scale-[.98] active:duration-75 transition-all" 
                            onClick={BookerListClose}
                        >
                            <CancelIcon/> Close
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
        )}
    </div>
    </section>
  );
  
  function AfterSelect() {
    books.RoomID = convertType(roomState);
    books.TimeslotID = convertType(TimeSlotState);
    if (roomState) {
        return (
            <section>
            <Paper className="rounded p-3">
                {slot.filter((item: TimeslotInterface) => (item.RoomID) === books.RoomID)
                    .map((item) => (
                       <>
                       {rooms.filter((rooms:RoomInterface) => (rooms.ID) === books.RoomID)
                        .map((rooms) => (
                            <Grid container className="my-2 rounded-lg bg-pink-50 px-2 py-3" key={rooms.ID}>
                                <Grid item xs={3}>
                                    <div className="flex items-center justify-center py-5 mt-1">
                                        <p className="text-center text-5xl text-slate-600">{item.Quantity}/{rooms.Capacity}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <ul>
                                        <li>
                                            <span className="font-semibold">Time: </span>
                                            {item.Slot}
                                        </li>
                                        <li><span className="font-semibold">Room: </span>{rooms.Activity}</li>
                                        <li><span className="font-semibold">Capacity: </span>{rooms.Capacity} persons</li>
                                        <li><span className="font-semibold">Attendant: </span>{rooms.Attendant}</li>
                                    </ul>  
                                </Grid>
                                <Grid item xs={3}>
                                    {showButton && 
                                        (buttonTime === item.Slot) ? (
                                            <div className="text-center pt-4">
                                                <button className="rounded px-2 py-1 mb-1 bg-pink-400 text-white font-semibold
                                                    hover:text-white hover:bg-green-500 active:scale-[.98] active:duration-75 transition-all"
                                                    onClick={() => BookerListOpen(item.ID)}
                                                >
                                                    View People
                                                </button>
                                                {(rooms.Capacity === item.Quantity) ? (
                                                    <button className="rounded px-2 py-1 bg-slate-400 text-white font-semibold"
                                                        disabled
                                                        >
                                                            <AssignmentTurnedInIcon/> Book
                                                    </button>
                                                ):(
                                                    <button className="rounded px-2 py-1 bg-pink-400 text-white font-semibold
                                                    hover:text-white hover:bg-green-500 active:scale-[.98] active:duration-75 transition-all"
                                                        onClick={() => handleDialogBookingOpen(item.ID)}
                                                    >
                                                        <AssignmentTurnedInIcon/> Book
                                                    </button>
                                                )}
                                        </div>
                                        ) : (
                                            <div className="text-center pt-4">
                                                <button className="rounded px-2 py-1 mb-1 bg-pink-400 text-white font-semibold
                                                    hover:text-white hover:bg-green-500 active:scale-[.98] active:duration-75 transition-all"
                                                    onClick={() => BookerListOpen(item.ID)}
                                                >
                                                    View People
                                                </button>
                                            </div>
                                        )
                                    }
                                    {!showButton && (<p className="text-red-500 font-medium text-lg text-center italic">Out Of Time</p>)}
                                </Grid>
                            </Grid>
                       ))}
                    </>
                ))}
            </Paper>
            </section>
        )
    } else {
        return (
            <Paper className="rounded p-3">
                <p className="italic text-red-600">
                    Sorry! We haven't got any booking on this section yet,
                    Please choose the services!
                </p>
            </Paper>
        )
    }
  }
}

export default Booking;