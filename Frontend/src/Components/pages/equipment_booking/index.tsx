import React from "react";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { useEffect, useState } from "react";
import { EquipmentBookingInterface } from "@/interfaces/IEquipmentBooking";
import { EquipmentTimeslotInterface } from "@/interfaces/IEquipmentTimeslot";
import { AlertProps, SelectChangeEvent } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { BookingInterface } from "@/interfaces/IBooking";
import { PictureInterface } from "@/interfaces/IPicture";
import { GetBooks, GetPictures } from "@/services/HttpClientService";

function EquipmentBooking() {
    const [equipmentBook, setEquipmentBook] = useState<EquipmentBookingInterface>({});
    const [TimeSlot, setTimeSlot] = useState<EquipmentTimeslotInterface[]>([]);
    const [books, setBooks] = useState<BookingInterface[]>([]);
    const [Equipments, setEquipments] = useState<PictureInterface[]>([]);
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

    const getPictures = async () => {
        let res = await GetPictures();
        if (res) {
            setEquipments(res);
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
        getPictures();
        getEquipmentTimeSlot();
        getBooks();
        //CurrentDateTime
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 500);
        return () => clearInterval(intervalId);
    }, []);

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
        </motion.div>
    </div>
  )
}

export default EquipmentBooking;