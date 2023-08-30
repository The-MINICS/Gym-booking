import React from "react";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Divider, FormControl, Grid, Paper, Select, SelectChangeEvent } from "@mui/material";
import { RoomInterface } from "@/interfaces/IRoom";
import { useEffect, useState } from "react";
import { BookingInterface } from "@/interfaces/IBooking";
import { MemberInterface } from "@/interfaces/IMember";
import { GetMemberByMID } from "@/services/HttpClientService";
import { TimeProportionInterface } from "@/interfaces/ITimeProportion";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function Booking() {
    const [books, setBooks] = useState<BookingInterface>({});
    const [rooms, setRooms] = useState<RoomInterface[]>([]);
    const [proPortion, setProPortion] = useState<TimeProportionInterface[]>([]);
    const [members, setMembers] = useState<MemberInterface>();
    const [roomState, setRoomState] = useState("")

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
        setRoomState(roomState)
        console.log(roomState)
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

    async function GetProportion() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/timeproportions`, requestOptions)
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

    const getProportion = async () => {
        let res = await GetProportion();
        if (res) {
            setProPortion(res);
        }
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };


    useEffect(() => {
        getMembers();
        getRooms();
        getProportion();
    }, []);

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
                    <span className="text-red-500">Booking System</span>
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
                            <div className="justify-center items-center text-center my-3">
                                <h1 className="font-bold text-xl text-orange-700 mb-3">
                                    My Bookings
                                </h1>
                                <Divider/>
                            </div>
                            <div className="text-left mb-1 flex items-center justify-start gap-2">
                                <h1 className="font-semibold text-lg">
                                    Service List:
                                </h1>
                                <h1 className="font-semibold text-base text-black">
                                    {members?.Firstname} {members?.Lastname}
                                </h1>
                            </div>
                            <div className="text-left mb-3">
                                <Paper className="rounded p-2">
                                    <p>My booking List (spacing)</p>
                                    <p>My booking List (spacing)</p>
                                    <p>My booking List (spacing)</p>
                                    <p>My booking List (spacing)</p>
                                    <p>My booking List (spacing)</p>
                                </Paper>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </motion.div>
        </motion.div>
    </div>
    </section>
  );
  
  function AfterSelect() {
    if (roomState === "1") {
        books.RoomID = convertType(roomState);
        return (
            <Paper className="rounded p-3">
                <p className="font-bold text-center items-center text-red-700">R201 Yoga Room Booking</p>
                {proPortion.map((item: TimeProportionInterface) => (
                    <Grid container>
                        <Grid item xs={9}>
                            <ul className="my-2 bg-pink-50 px-2 py-3">
                                <li><span className="font-semibold">Time: </span>{item.Proportion}</li>
                                <li><span className="font-semibold">Capacity: </span>{books.RoomID}</li>
                                <li><span className="font-semibold">Capacity: </span>{books.RoomID}</li>
                                <li><span className="font-semibold">Attendant: </span>{books.RoomID}</li>
                            </ul>  
                        </Grid>
                        <Grid item xs={3}>
                            <div className="my-2 bg-pink-50 pr-1 py-6 text-center">
                                <button className="rounded px-2 py-1 mb-2 bg-pink-400 text-white font-semibold">
                                    View People
                                </button>
                                <button className="rounded px-2 py-1 bg-pink-400 text-white font-semibold">
                                    <AssignmentTurnedInIcon/> Book
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                ))}  
            </Paper>
        )
    }
    else if (roomState === "2") {
        books.RoomID = convertType(roomState);
        return (
            <Paper className="rounded p-3">
                <p className="font-bold text-center items-center text-red-700">R202 Aerobic Room Booking</p>
                {proPortion.map((item: TimeProportionInterface) => (
                    <ul className="my-2">
                        <li className="bg-slate-100 px-2">Time: {item.Proportion}</li>
                        <li className="bg-slate-100 px-2">Capacity: {books.RoomID}</li>
                        <li className="bg-slate-100 px-2">Quantity: {books.RoomID}</li>
                        <li className="bg-slate-100 px-2">Attendant: {books.RoomID}</li>
                    </ul>
                ))}
            </Paper>
        )
    }
    else if (roomState === "3") {
        books.RoomID = convertType(roomState);
        return (
            <Paper className="rounded p-3">
                <p className="font-bold text-center items-center text-red-700">R203 Pilates Room Booking</p>
                {proPortion.map((item: TimeProportionInterface) => (
                    <ul className="my-2">
                        <li className="bg-slate-100 px-2">Time: {item.Proportion}</li>
                        <li className="bg-slate-100 px-2">Capacity: {books.RoomID}</li>
                        <li className="bg-slate-100 px-2">Quantity: {books.RoomID}</li>
                        <li className="bg-slate-100 px-2">Attendant: {books.RoomID}</li>
                    </ul>
                ))}
            </Paper>
        )
    }
    else if (roomState === "4") {
        books.RoomID = convertType(roomState);
        return (
            <Paper className="rounded p-3">
                <p className="font-bold text-center items-center text-red-700">R204 Taekwondo Room Booking</p>
                {proPortion.map((item: TimeProportionInterface) => (
                    <ul className="my-2">
                        <li className="bg-slate-100 px-2">Time: {item.Proportion}</li>
                        <li className="bg-slate-100 px-2">Capacity: {books.RoomID}</li>
                        <li className="bg-slate-100 px-2">Quantity: {books.RoomID}</li>
                        <li className="bg-slate-100 px-2">Attendant: {books.RoomID}</li>
                    </ul>
                ))}
            </Paper>
        )
    }
    else if (roomState === "5") {
        books.RoomID = convertType(roomState);
        return (
            <Paper className="rounded p-3">
                <p className="font-bold text-center items-center text-red-700">R205 Fitness Booking</p>
                {proPortion.map((item: TimeProportionInterface) => (
                    <ul className="my-2">
                        <li className="bg-slate-100 px-2">Time: {item.Proportion}</li>
                        <li className="bg-slate-100 px-2">Capacity: {books.RoomID}</li>
                        <li className="bg-slate-100 px-2">Quantity: {books.RoomID}</li>
                        <li className="bg-slate-100 px-2">Attendant: {books.RoomID}</li>
                    </ul>
                ))}
            </Paper>
        )
    }
    else {
        return (
            <Paper className="rounded p-3">
                <p className="italic text-red-600">
                    Sorry! We haven't got any booking yet,
                    Please choose the services!
                </p>
            </Paper>
        )
    }
  }
}

export default Booking;