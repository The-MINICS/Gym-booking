import React from "react";
import "@/Components/pages/equipment_booking/equipment-booking.css"
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { useEffect, useState } from "react";
import { EquipmentBookingInterface } from "@/interfaces/IEquipmentBooking";
import { EquipmentTimeslotInterface } from "@/interfaces/IEquipmentTimeslot";
import { AlertProps, SelectChangeEvent } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { BookingInterface } from "@/interfaces/IBooking";
import { PictureInterface } from "@/interfaces/IPicture";
import { GetBooks, GetEquipments, GetPictures } from "@/services/HttpClientService";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { EquipmentInterface } from "@/interfaces/IEquipment";

function EquipmentBooking() {
    const [equipmentBook, setEquipmentBook] = useState<EquipmentBookingInterface>({});
    const [TimeSlot, setTimeSlot] = useState<EquipmentTimeslotInterface[]>([]);
    const [books, setBooks] = useState<BookingInterface[]>([]);
    const [Equipments, setEquipments] = useState<EquipmentInterface[]>([]);
    const [Pictures, setPictures] = useState<PictureInterface[]>([]);
    const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const apiUrl = "http://localhost:9999";

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof equipmentBook;
        setEquipmentBook({
          ...equipmentBook,
          [name]: event.target.value,
        });
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof EquipmentBooking;
        const { value } = event.target;
        setEquipmentBook({ ...equipmentBook, [id]: value });
    };

    async function GetEquipmentTimeSlot() {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
      
        let res = await fetch(`${apiUrl}/equipmenttimeslots`, requestOptions)
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
            setTimeSlot(res);
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
        getEquipments();
        getEquipmentTimeSlot();
        getBooks();
        getPictures();
        //CurrentDateTime
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 500);
        return () => clearInterval(intervalId);
    }, []);

    const EquipmentItems = () => {
      for (let index = 1; index <= Pictures.length; index++){
        return (
          <>
          {Equipments.filter((eqBook: EquipmentInterface) => (eqBook.PictureID) === index)
            .map((eqBook) => (
              <div className="flex items-center justify-start gap-2">
                <button className="bg-slate-100 rounded-md p-2 m-1 hover:bg-yellow-500 
                  active:scale-[.98] active:duration-75 transition-all">
                  <img src={`${eqBook.Picture?.Picture}`} width="100" height="250"/>
                </button>
              </div>
            ))
          }
          </>
        )
      }
    }

    return (
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
                <div className="flex EB-book-header">
                  <div>
                    <p>Booking Time</p>
                  </div>
                </div>
              </div>
              {/* Equipment time */}
              <div className="EB-equipment-time">
                <div className="flex EB-equipment-header">
                  {/* select time */}
                  <div className="flex justify-center items-center gap-2">
                    {TimeSlot.map((eqTime: EquipmentTimeslotInterface) => (
                      <button className="bg-slate-100 p-1 shadow flex items-center justify-center rounded gap-1 w-max
                         hover:bg-yellow-500 active:scale-[.98] active:duration-75 transition-all">
                        <AccessTimeIcon/>
                        <p className="text-center font-medium">{eqTime.Equipmentslot}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="EB-status">
                <div className="EB-status-inside">
                  <p>Status</p>
                </div>
              </div>
              <div className="EB-Area">
                {EquipmentItems()}
                {/* {Equipments.map((eqBook: EquipmentInterface) => (
                  <div className="flex items-center justify-start gap-2">
                    <button className="bg-slate-100 rounded-md p-2 m-1 hover:bg-yellow-500 
                      active:scale-[.98] active:duration-75 transition-all">
                      <img src={`${eqBook.Picture?.Picture}`} width="100" height="250"/>
                    </button>
                  </div>
                ))} */}
              </div>
            </div>
        </motion.div>
    </div>
  )
}

export default EquipmentBooking;