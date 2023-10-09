import React from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "@/Components/pages/booking_schedule/booking_sch_styles.css"
import ListIcon from '@mui/icons-material/List';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useState } from "react";
import { EquipmentBookingInterface } from "@/interfaces/IEquipmentBooking";
import { MemberInterface } from "@/interfaces/IMember";
import { BookingInterface } from "@/interfaces/IBooking";
import { GetBooks, GetEquipmentBookings, GetEquipments, GetMemberByMID } from "@/services/HttpClientService";
import { Divider, Grid } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { EquipmentInterface } from "@/interfaces/IEquipment";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

function BookingSCH() {
    const [holdStateCalendarEvent, setHoldStateCalendarEvent] = useState(false);
    const [holdStateCardsEvent, setHoldStateCardsEvent] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [bookingShow, setBookingShow] = useState<number>();
    const [members, setMembers] = useState<MemberInterface>({});
    const [EquipmentBooks, setEquipmentBooks] = useState<EquipmentBookingInterface[]>([]);
    const [books, setBooks] = useState<BookingInterface[]>([]);
    const [Equipments, setEquipments] = useState<EquipmentInterface[]>([]);
    const [dialogWidth, setDialogWidth] = useState<number | string>('auto');
    const dialogContentRef = React.createRef<HTMLDivElement>();

    const localizer = momentLocalizer(moment);
    const Noholdstate = `bg-slate-100 p-1 shadow rounded gap-1 w-max
    hover:shadow-xl active:scale-[.98] active:duration-75 transition-all`
    const Holdstate = `bg-red-200 p-1 shadow rounded gap-1 w-max
    active:scale-[.98] active:duration-75 transition-all`

    const CalenderEventHandler = () => {
        setHoldStateCalendarEvent(true);
        setHoldStateCardsEvent(false);
    }

    const CardsEventHandler = () => {
        setHoldStateCalendarEvent(false);
        setHoldStateCardsEvent(true);
    }

    const ShowEventOpenHandler = (bookingID: any) => {
        setIsExpanded(false);
        const BookingID = convertType(bookingID);
        setBookingShow(BookingID);
        const contentWidth = dialogContentRef.current?.scrollWidth;
        if (contentWidth) {
            setDialogWidth(contentWidth);
        }
        setIsExpanded(true);
    }

    const ShowEventCloseHandler = () => {
        setIsExpanded(false);
    }

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

    const getBooks = async () => {
        let res = await GetBooks();
        if (res) {
          setBooks(res);
      }
    };

    const getEquipments = async () => {
        let res = await GetEquipments();
        if (res) {
          setEquipments(res);
        }
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    useEffect(() => {
        GetMembers();
        getEquipmentBookings();
        getBooks();
        getEquipments();
    }, []);

    const events = books
        .filter((booking) => (booking.MemberID === members.ID) && (booking.StatusID === 3))
        .map((booking) => 
            {
                const start = new Date(booking.Datetime || 0);
                const end = new Date(booking.Datetime || 0);
                end.setHours(start.getHours() + 5);
                return {
                    title: booking.Room?.Activity + ' ' + 'room booking',
                    start,
                    end,
                    description: (
                    `(${members.Username})~${members.Firstname} ${members.Lastname}~ 
                    Room: ${booking.Room?.Activity}
                    Room Number: ${booking.Room?.Number}
                    Attendant: ${booking.Room?.Attendant}
                    Period: ${booking.Timeslot?.Slot}
                    Note: "${booking.Note}"`
                    )
                };
            }
    );

    const eventStyleGetter = () => {
        const style = {
          backgroundColor: '#800000',
          color: 'white',
          border: '1px solid #ccc',
        };
      
        return {
          style,
        };
    };

    return (
    <div className="w-full">
        <motion.div className="bg-slate-50 p-4 md:p-6 lg:p-8 min-h-screen grid md:gap-6 lg:gap-8 grid-rows-auto1">
            {/* Header */}
            <motion.div
                className="text-center grid p-4 place-items-center content-center"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
                >
                <h1 className="text-3xl sm:text-6xl font-bold bg-clip-text text-transparent
                 bg-gradient-to-br pb-4 md:pb-4 from-red-500 to-violet-700 dark:from-blue-400">
                    My Calendar Events
                </h1>
                <h1 className="font-bold text-center text-rose-700 text-2xl">By "{members.Firstname} {members.Lastname}"</h1>
                <label htmlFor="eventAmt">Events to Show</label>
                <div className="flex gap-2">
                    <button id="eventAmt"
                        onClick={() => CalenderEventHandler()}
                        className= {holdStateCalendarEvent ? `${Holdstate}` : `${Noholdstate}`}
                        >
                        <CalendarMonthIcon/>
                    </button>
                    <button id="eventAmt"
                        onClick={() => CardsEventHandler()}
                        className= {holdStateCardsEvent ? `${Holdstate}` : `${Noholdstate}`}
                    >
                        <ListIcon/>
                    </button>
                </div>
            </motion.div>

            {/* Section */}
            <motion.div
                className="max-w-6xl w-full mx-auto"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                variants={{
                    hidden: { opacity: 0, x:-50 },
                    visible: { opacity: 1, x:-0 }
                }}
                >
                <section id="events-container"
                    className="grid gap-4 md:gap-6 lg:gap-8 items-start grid-cols-cards" 
                >
                    {/* Event Calender */}
                    {holdStateCalendarEvent && (
                        <div>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                views={['month']}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 1000, color: "black" }}
                                eventPropGetter={eventStyleGetter}
                                tooltipAccessor={(event) => event.description}
                            />
                        </div>
                    )}

                    {/* Event Cards */}
                    {holdStateCardsEvent && (
                        <React.Fragment>
                        {books.filter((bookings: BookingInterface) => ((bookings.MemberID) === members.ID) && 
                            (bookings.StatusID === 3)
                        )
                            .map((bookings) => (
                                <article className="bg-white shadow-xl shadow-slate-200 rounded-lg">
                                    <div className="p-3 shadow bg-rose-500 text-indigo-50 uppercase grid
                                        place-items-center rounded-t-lg"
                                        >
                                            <p className="text-lg font-medium">{dayjs(bookings.Datetime).format('MMMM')}</p>
                                            <p className="text-4xl font-bold">{dayjs(bookings.Datetime).format('DD')}</p>
                                    </div>
                                    <div className="p-4 md:p-6 lg:p-8 grid gap-4 md:gap-6">
                                        <div className="grid gap-1">
                                            <p className="text-slate-400 text-sm">{dayjs(bookings.Datetime).format('MMM DD, YYYY')}</p>
                                            <h2 className="font-bold text-2xl uppercase">
                                                {bookings.Room?.Activity} Room Booking
                                            </h2>
                                            <div className="grid gap-1">
                                                <div className="grid gap-1">
                                                    <ul>
                                                        <li className="text-blue-800"><span className="font-medium text-blue-900 text-base">Room: </span>{bookings.Room?.Activity}</li>
                                                        <li className="text-blue-800"><span className="font-medium text-blue-900 text-base">Room Number: </span>
                                                            <span className="uppercase">{bookings.Room?.Number}</span>
                                                        </li>
                                                        <li className="text-blue-800"><span className="font-medium text-blue-900 text-base">Attendant: </span>{bookings.Room?.Attendant}</li>
                                                        <li className="text-blue-800"><span className="font-medium text-blue-900 text-base">Period: </span>{bookings.Timeslot?.Slot}</li>
                                                        <li className="text-blue-800"><span className="font-medium text-blue-900 text-base">Booking Date: </span>
                                                            {dayjs(bookings.Datetime).format('YYYY-MM-DD')}
                                                        </li>
                                                        <li className="font-medium text-blue-900 text-base">Leave Messages:
                                                            <span className="text-green-600 font-medium italic">"{bookings.Note}"</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {bookings.Room?.Activity && (bookings.StatusID === 3) && (bookings.Room?.Activity.includes("fitness") || 
                                            bookings.Room?.Activity.includes("Fitness")) ? 
                                            (
                                                <button className="bg-rose-600 rounded-md px-4 py-2 text-indigo-50 shadow-2xl shadow-indigo-200
                                                    text-center font-bold hover:shadow-none ring ring-offset-0 ring-rose-600 focus:outline-none focus:ring-offset-2
                                                    transition-all"
                                                    onClick={() => ShowEventOpenHandler(bookings.ID)}
                                                    >
                                                    View Event
                                                </button>
                                            ) : ("")
                                        }
                                    </div>
                                </article>
                            ))
                        }
                        </React.Fragment>
                    )}
                </section>

                {/* Show Event from Equipment Booking */}
                {isExpanded && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm">
                        <dialog
                            open={isExpanded}
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
                                maxHeight: '80vh',
                            }}
                            >
                                <div ref={dialogContentRef}
                            >
                                {books.filter((booking: BookingInterface) => (booking.ID) === bookingShow)
                                    .map((booking) => (
                                        <>
                                        <div className="bg-rose-600 p-2 rounded-md mb-2">
                                            <p className="text-center text-lg font-semibold text-slate-200">{dayjs(booking.Datetime).format('MMM DD, YYYY')}</p>
                                            <h1 className="text-center font-bold text-white font-monserrat text-2xl uppercase">
                                                {booking.Room?.Activity} Room Booking
                                            </h1>
                                            <p className="text-slate-300 font-light text-sm text-center uppercase">({members.Username}) {members.Firstname} {members.Lastname}</p>
                                        </div>
                                        <Divider/>
                                        <div className="mb-3 mt-1 event-card">
                                        {EquipmentBooks.filter((EQbooks: EquipmentBookingInterface) => ((EQbooks.BookingID) === bookingShow) && (EQbooks.StatusID === 3))
                                            .map((EQbooks) => (
                                                <React.Fragment>
                                                    <div className="bg-pink-200 p-1 flex justify-start items-center gap-1 my-2">
                                                        <h1 className="font-normal">Equipment Using Period: </h1>
                                                        <h2 className="font-bold">{EQbooks.EquipmentTimeslot?.Equipmentslot}</h2>
                                                    </div>
                                                    <div className="sticky-header">
                                                        <Grid container>
                                                            {Equipments.filter((EQitem: EquipmentInterface) => (EQitem.ID) === EQbooks.EquipmentID)
                                                                .map((EQitem, index) => (
                                                                    <React.Fragment key={index}>
                                                                        <Grid item xs={4}>
                                                                            <div key={index} className="p-1 flex justify-center items-center bg-slate-200 rounded-md">
                                                                                <img src={`${EQitem.Picture?.Picture}`} width="150" height="100" alt={`Image ${index}`}/>
                                                                            </div>
                                                                            <p className="m-1 font-bold text-center text-current">{EQitem.Name}</p>
                                                                        </Grid>
                                                                        <Grid item xs={8}>
                                                                            <ul className="ml-8">
                                                                                <li className="font-medium text-blue-900">Equipment Catergory:
                                                                                    <span className="font-bold text-red-900 uppercase"> {EQitem.Picture?.Title}</span>
                                                                                </li>
                                                                                <li className="font-medium text-blue-900">Description:
                                                                                    <span className="font-medium text-red-900"> "{EQitem.Picture?.Describe}"</span>
                                                                                </li>
                                                                                <li className="font-medium text-blue-900">Leave Messages:
                                                                                    <span className="text-green-600 font-medium italic">"{EQbooks.EquipmentNote}"</span>
                                                                                </li>
                                                                            </ul>
                                                                        </Grid>
                                                                    </React.Fragment>
                                                                ))
                                                            }
                                                        </Grid>
                                                    </div>
                                                </React.Fragment>
                                            ))
                                        }
                                        </div>
                                        </>
                                    ))
                                }
                                <Divider/>
                                <div className="flex justify-center items-center gap-3 my-3">
                                    <button className="rounded px-2 py-1 bg-red-600 text-white active:scale-[.98] active:duration-75 transition-all" 
                                        onClick={ShowEventCloseHandler}
                                    >
                                        <CancelIcon/> Close
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                )}
            </motion.div>
        </motion.div>
    </div>
  )
}

export default BookingSCH;