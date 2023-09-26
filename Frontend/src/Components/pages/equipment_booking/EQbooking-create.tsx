import React from "react";
import dayjs from "dayjs";
import "@/Components/pages/equipment_booking/equipment-booking.css"
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import { EquipmentBookingInterface } from "@/interfaces/IEquipmentBooking";
import { EquipmentTimeslotInterface } from "@/interfaces/IEquipmentTimeslot";
import { AlertProps, Grid, Divider } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { BookingInterface } from "@/interfaces/IBooking";
import { PictureInterface } from "@/interfaces/IPicture";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { EquipmentInterface } from "@/interfaces/IEquipment";
//import { useParams } from "react-router-dom";
//import { TimeslotInterface } from "@/interfaces/ITimeslot";
import UserPhoto from '@/assets/UserProfile.png';
import AdminPhoto from '@/assets/AdministratorProfile.png';
import { MemberInterface } from "@/interfaces/IMember";
import { Link } from "react-router-dom";
//import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { 
  Dialog, DialogActions, DialogContent, DialogContentText,  
  DialogTitle, Button,
} from "@mui/material";
import { 
  EquipmentBookDelete,
  GetBooks, 
  GetEquipmentBookings, 
  GetEquipmentTimeSlot, 
  GetEquipments, 
  GetMemberByMID, 
  GetPictures,
} from "@/services/HttpClientService";

function EquipmentBookingCreate() {
    const [equipmentBook, setEquipmentBook] = useState<EquipmentBookingInterface>({});
    const [members, setMembers] = useState<MemberInterface>({});
    const [EquipmentBooks, setEquipmentBooks] = useState<EquipmentBookingInterface[]>([]);
    const [EQTimeSlot, setEQTimeSlot] = useState<EquipmentTimeslotInterface[]>([]);
    const [books, setBooks] = useState<BookingInterface[]>([]);
    const [Equipments, setEquipments] = useState<EquipmentInterface[]>([]);
    const [Pictures, setPictures] = useState<PictureInterface[]>([]);
    const [openEQBooking, setOpenEQBooking] = useState(false);
    const [holdStateButtonBookTime, setholdStateButtonBookTime] = useState<number>();
    const [clickedButtonEQTime, setClickedButtonEQTime] = useState("");
    const [holdStateButtonEQTime, setholdStateButtonEQTime] = useState<number>();
    const [clickedButtonEQGroup, setClickedButtonEQGroup] = useState("");
    const [holdStateButtonEQGroup, setholdStateButtonEQGroup] = useState<number>();
    const [dialogWidth, setDialogWidth] = useState<number | string>('auto');
    const dialogContentRef = React.createRef<HTMLDivElement>();
    const [clickedEQid, setClickedEQid] = useState<number>();
    const [equipmentTime, setEquipmentTime] = useState<number>();
    const [roomTimeShow, setRoomTimeShow] = useState<string>("");
    const [roomBookingTime, setRoomBookingTime] = useState<string>("");
    const [deleteID, setDeleteID] = useState<number>(0);
    const [openDelete, setOpenDelete] = useState(false);
    const roles = localStorage.getItem("role");

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const Noholdstate = `bg-slate-100 p-1 shadow flex items-center justify-center rounded gap-1 w-max
    hover:bg-yellow-500 active:scale-[.98] active:duration-75 transition-all`
    const Holdstate = `bg-yellow-500 p-1 shadow flex items-center justify-center rounded gap-1 w-max
    active:scale-[.98] active:duration-75 transition-all`

    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
          const id = event.target.id as keyof typeof equipmentBook;
          const { value } = event.target;
          setEquipmentBook({ ...equipmentBook, [id]: value });
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
      let res = await EquipmentBookDelete(deleteID)
      if (res) {
          console.log(res.data)
      } else {
          console.log(res.data)
      }
      setOpenDelete(false)
      setTimeout(() => {
        window.location.href = "/equipmentbooking-create";
      }, 1000);
  }

    const buttonEQTimeHandler = (id:any, value: any) => {
      const EquipmentTimeSlotID = convertType(id);
      equipmentBook.EquipmentTimeslotID = EquipmentTimeSlotID;
      setClickedButtonEQTime(value);
      setholdStateButtonEQTime(EquipmentTimeSlotID);
    };

    const buttonEQGroupHandler = (id:any, value: any) => {
      const EquipmentGroupID = convertType(id);
      setClickedButtonEQGroup(value);
      setholdStateButtonEQGroup(EquipmentGroupID);
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

  const handleDialogEQBookingOpen = (eqID: any) => {
    setOpenEQBooking(false);
    const EquipmentOnClick = convertType(eqID);
    equipmentBook.EquipmentID = EquipmentOnClick;
    const contentWidth = dialogContentRef.current?.scrollWidth;
    if (contentWidth) {
      setDialogWidth(contentWidth);
    }
    setOpenEQBooking(true);
    setClickedEQid(EquipmentOnClick);
  };

  const buttonRoomBookingHandler = (bookID: any, bookTimeID: any, roomTime: any, roomBooking: any) => {
    const BookID = convertType(bookID);
    const BookTimeID = convertType(bookTimeID);
    equipmentBook.BookingID = BookID;
    setEquipmentTime(BookTimeID);
    setRoomTimeShow(roomTime);
    setRoomBookingTime(roomBooking);
    setholdStateButtonBookTime(BookID);
  };

  const handleDialogEQBookingClose = () => {
    setOpenEQBooking(false)
  }

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
      props,
      ref
    ) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
    
    const GetMembers = async () => {
      let res = await GetMemberByMID();
      if (res) {
          setMembers(res);
      }
    };

    const getEquipmentBookings = async () => {
      let res = await GetEquipmentBookings();
      if (res) {
        setEquipmentBooks(res);
      }
    };

    const getEquipments = async () => {
      let res = await GetEquipments();
      if (res) {
        setEquipments(res);
      }
    };

    const getPictures = async () => {
      let res = await GetPictures();
      if (res) {
        setPictures(res);
      }
    };

    const getEquipmentTimeSlot = async () => {
        let res = await GetEquipmentTimeSlot();
        if (res) {
          setEQTimeSlot(res);
        }
    };

    const getBooks = async () => {
        let res = await GetBooks();
        if (res) {
          setBooks(res);
      }
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    useEffect(() => {
        GetMembers();
        getEquipmentBookings();
        getEquipments();
        getEquipmentTimeSlot();
        getBooks();
        getPictures();
    }, []);

    async function submit() {
      let data = {
          EquipmentNote: equipmentBook.EquipmentNote,
          EquipmentID: convertType(equipmentBook.EquipmentID),
          EquipmentTimeslotID: convertType(equipmentBook.EquipmentTimeslotID),
          BookingID: convertType(equipmentBook.BookingID),
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
    
      fetch(`${apiUrl}/equipmentbookings`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res)
          if (res.data) {
            console.log("seved")
            setSuccess(true);
            setErrorMessage("")
            setTimeout(() => {
              window.location.href = "/equipmentbooking-create";
          }, 1000);
          } else {
            console.log("save failured!")
            setError(true);
            setErrorMessage(res.error)
          }
      });
  }

    return (
    <div className="w-full">
        <motion.div className="mx-auto w-5/6 pt-10 pb-5 bg-center">
          {/* Snackbar */}
              <Snackbar
                  id="success"
                  open={success}
                  autoHideDuration={5000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert onClose={handleClose} severity="success">
                      You've booked the equipment
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
                    <span className="text-red-500">Equipment Booking</span>
                </HText>
                <p className="my-5">
                Are you tired of the hassle that comes with managing reservations and appointments? 
                Look no further! Our Booking System is designed to streamline your reservation processes, 
                enhance customer satisfaction, and boost your business's efficiency.
                </p>
            </motion.div>

            {/* Booking Equipment */}
            <div className="EquipmentBookingArea">
              {/* Booking time */}
              <div className="EB-book-time">
                <p className="font-bold text-base py-1">Your Fitness Room:</p>
                <div className="flex EB-book-header gap-2 mb-2">
                  {books.filter((BookTime: BookingInterface) => (BookTime.MemberID) === members.ID)
                    .map((BookTime) => (
                      <button key={BookTime.ID}
                        onClick={() => buttonRoomBookingHandler(BookTime.ID, BookTime.TimeslotID, BookTime.Timeslot?.Slot, 
                            dayjs(BookTime.Datetime).format('YYYY-MM-DD'))}
                        className= {holdStateButtonBookTime === BookTime.ID ? `${Holdstate}` : `${Noholdstate}`}
                        >
                          <EventAvailableIcon/>
                          <p className="font-bold">{dayjs(BookTime.Datetime).format('YYYY-MM-DD')}</p> : 
                          <AccessTimeIcon/>
                          <p className="font-bold">{BookTime.Timeslot?.Slot}</p>
                      </button>
                    ))
                  }
                </div>
              </div>
              {/* Booking time */}
              <div className="EB-equipment-time">
                <p className="font-bold text-base py-1">Equipment Booking Period:</p>
                <div className="flex EB-equipment-header">
                  <div className="flex gap-2 mb-2">
                    {EQTimeSlot.filter((eqTime: EquipmentTimeslotInterface) => (eqTime.TimeslotID) === equipmentTime)
                      .map((eqTime) => (
                        <button key={eqTime.ID}
                          onClick={() => buttonEQTimeHandler(eqTime.ID, eqTime.Equipmentslot)}
                          className= {holdStateButtonEQTime === eqTime.ID ? `${Holdstate}` : `${Noholdstate}`}
                          >
                            <AccessTimeIcon/>
                            <p className="text-center font-medium">{eqTime.Equipmentslot}</p>
                        </button>
                      ))
                    }
                  </div>
                </div>
              </div>

              {/* Equipment time */}
              <div className="EB-topic-header">
                <p className="font-bold text-base">Equipment Catergories:</p>
              </div>
              <div className="EB-topic">
                <div className="flex gap-2 EB-topic-inside">
                  {Pictures.map((EQTopic: PictureInterface) => (
                    <button key={EQTopic.ID}
                        onClick={() => buttonEQGroupHandler(EQTopic.ID, EQTopic.Title)}
                        className= {holdStateButtonEQGroup === EQTopic.ID ? `${Holdstate}` : `${Noholdstate}`}
                        >
                        <p className="text-center font-medium">{EQTopic.Title}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment Booking Area */}
              <div className="EB-Area">
                <Grid container sx={{ padding: 1 }}>
                  <Grid item xs={9}>
                    {EquipmentArea()}
                  </Grid>
                  <Grid item xs={3}>
                    <div className="rounded-xl bg-white p-2">
                      <div className="flex items-center justify-center">
                        {ImageOption()}
                      </div>
                      <p className="font-bold text-center">{members.Username} : {members.Role?.Role}</p>
                      <ul>
                        <li>Full-Name: <span className="text-yellow-500 italic">{members.Firstname} {members.Lastname}</span></li>
                        <li>Fitness Room Date: <span className="text-yellow-500 italic">"{roomBookingTime}"</span></li>
                        <li>Fitness Room Period: <span className="text-yellow-500 italic">"{roomTimeShow}"</span></li>
                        <li>Equipment Booking: <span className="text-yellow-500 italic">
                          {clickedButtonEQTime !== "" ? `"${clickedButtonEQTime}"` : ""}</span>
                        </li>
                        <li>Equipment Catergory: <span className="text-yellow-500 italic">
                          {clickedButtonEQGroup !== "" ? `"${clickedButtonEQGroup}"` : ""}</span>
                        </li>
                      </ul>
                      <p>Equipment Booking List:</p>
                        {EquipmentBooks.filter((EQBookShow: EquipmentBookingInterface) => (EQBookShow.Booking?.MemberID) === members.ID)
                          .map((EQBookShow) => (
                            <Grid container className="bg-pink-100 my-2 px-2 py-2 rounded-lg mx-auto">
                              <Grid item xs={9}>
                                <ul className="px-2">
                                  <li><span className="font-semibold">EQ: </span>{EQBookShow.Equipment?.Name}</li>
                                  <li><span className="font-semibold">Period: </span>{EQBookShow.EquipmentTimeslot?.Equipmentslot}</li>
                                  <li><span className="font-semibold">Date: </span>
                                    {dayjs(EQBookShow.EquipmentDatetime).format('YYYY-MM-DD')}
                                  </li>
                                  <li className="text-green-700"><span className="font-semibold">Note: </span>
                                    "{EQBookShow.EquipmentNote}"
                                  </li>
                                </ul> 
                              </Grid>
                              <Grid item xs={3} style={{ textAlign: "right" }}>
                                <button className="cursor-pointer active:scale-[.98] active:duration-75 transition-all mb-2"
                                  onClick={() => {handleDialogDeleteOpen(Number(EQBookShow.ID))}}
                                  >
                                  <CancelIcon/>
                                </button>
                              </Grid>
                          </Grid>
                          ))
                        }
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>

            {/* EquipmentBooking Dialog */}
            {openEQBooking && (
              <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
              <dialog
                  open={openEQBooking}
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
                              Equipment Booking
                          </h1>
                          <Divider/>
                      </div>
                      <div className="m-3">
                        <Grid container sx={{ padding: 1 }}>
                          <Grid item xs={4}>
                            {Equipments.filter((EQitem: EquipmentInterface) => (EQitem.ID) === clickedEQid)
                              .map((EQitem, index) => (
                                <>
                                <div key={index} className="p-1 flex justify-center items-center bg-slate-200 rounded-md">
                                  <img src={`${EQitem.Picture?.Picture}`} width="250" height="auto" alt={`Image ${index}`}/>
                                </div>
                                <p className="m-1 font-bold text-center text-current">{EQitem.Name}</p>
                                </>
                              ))
                            }
                          </Grid>
                          <Grid item xs={8}>
                            <ul className="ml-10">
                              <li className="font-bold">UserName: <span className="font-medium text-red-900">{members.Username}</span></li>
                              <li className="font-bold">Full-Name: <span className="font-medium text-red-900">{members.Firstname} {members.Lastname}</span></li>
                              <li className="font-bold">Date & Period: <span className="font-medium text-red-900">"{roomBookingTime}" : "{roomTimeShow}"</span></li>
                              <li className="font-bold">Equipment Booking: <span className="font-medium text-red-900">{`"${clickedButtonEQTime}"`}</span></li>
                              <li className="font-bold">Catergory: <span className="font-medium text-red-900">{`"${clickedButtonEQGroup}"`}</span></li>
                            </ul>
                            <div className="ml-10">
                              <div className="flex justify-start items-center gap-2">
                                <p className="font-bold">Leave Note</p>
                                <p className="text-red-500 italic text-sm">(Limit: 50 characters)</p>
                              </div>
                              <textarea
                                className="w-full rounded-lg px-5 py-3 bg-slate-50 font-medium text-red-950"
                                placeholder="Leave Note Message"
                                id="EquipmentNote"
                                rows={3}
                                cols={30}
                                value={equipmentBook.EquipmentNote || ""}
                                onChange={handleInputChange}
                              />
                            </div> 
                          </Grid>
                        </Grid>
                      </div>
                      <Divider/>
                      <div className="flex justify-center items-center gap-3 my-3">
                          <button className="rounded px-2 py-1 bg-red-600 text-white active:scale-[.98] active:duration-75 transition-all" 
                              onClick={handleDialogEQBookingClose}
                          >
                              <CancelIcon/> Cancel
                          </button>
                          <button className="rounded px-2 py-1 text-white font-semibold
                              bg-green-500 active:scale-[.98] active:duration-75 transition-all" 
                              onClick={submit}
                          >
                              <CheckIcon/> Book Now!
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
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Equipment Booking Delete
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  If you delete this Equipment then you won't be able to recover any more. 
                  Do you want to delete this Equipment?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color= "error" onClick={handleDialogDeleteclose}>Cancel</Button>
                <Button color= "secondary" onClick={handleDelete} className="bg-red-500" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
          </Dialog>

          {/* Room Booking button */}
            <div className="flex items-center justify-between m-3">
              <button className="rounded bg-red-100 border-solid
                active:scale-[.98] active:duration-75 transition-all">
                  <Link to="/bookings" className="flex items-center justify-center gap-1 p-2">
                    <AssignmentTurnedInIcon/>
                      <p className="font-bold text-xl">Room Booking</p>
                  </Link>
              </button>
              <button className="rounded bg-green-600 text-white border-solid
                active:scale-[.98] active:duration-75 transition-all">
                  <Link to="/bookingsch" className="flex items-center justify-center gap-1 p-2">
                      <EventAvailableIcon/>
                      <p className="font-bold text-xl">Booking Schedule</p>
                  </Link>
              </button>
            </div>
        </motion.div>
    </div>
  );

  function ImageOption() {
    if (roles === 'User') {
      return (
      <img className='w-36 h-36 mb-1' src={UserPhoto} alt='user-photo'/>
      )
    }
    if (roles === 'Admin') {
      return(
      <img className='w-36 h-36 mb-1' src={AdminPhoto} alt='admin-photo'/>
      )
    }
  }

  function EquipmentArea() {
    if (holdStateButtonEQGroup) {
      return (
        <section>
          <div>
            {Equipments.filter((EQitems: EquipmentInterface) => (EQitems.PictureID) === holdStateButtonEQGroup)
              .map((EQitems ,index) => (
                <>
                  <button key={index} onClick={() => handleDialogEQBookingOpen(EQitems.ID)}
                    className="rounded active:scale-[.98] active:duration-75 transition-all bg-slate-100 p-4 hover:bg-yellow-500 m-3">
                    <img src={`${EQitems.Picture?.Picture}`} width="150" height="auto" alt={`Image ${index}`}/>
                  </button>
                </>
              ))
            }
          </div>
        </section>
      )
    } else {
      return (
        <p className="text-center text-red-600 font-medium italic text-2xl">Please choose the Equipment Catergories!</p>
      )
    }
  }
}

export default EquipmentBookingCreate;