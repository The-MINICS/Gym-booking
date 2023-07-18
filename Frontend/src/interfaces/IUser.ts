import { GenderInterface } from "./IGender";
import { ReservationInterface } from "./IReservation";

export interface UserInterface {
    ID?: number,
    Username?: string;
    Gmail?: string;
    Password?: string;
    Fullname?: string;
    Age?: number;
    Weight?: number;
    Height?: number;

    GenderID?: number;
    Gender?: GenderInterface;

    ReservationID?: number;
    Reservation?: ReservationInterface;
}