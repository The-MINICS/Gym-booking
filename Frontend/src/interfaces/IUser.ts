import { GenderInterface } from "./IGender";
import { ReservationInterface } from "./IReservation";

export interface UserInterface {
    ID?: number,
    Username?: string;
    Email?: string;
    Password?: string;
    Firstname?: string;
    Lastname?: string;
    Age?: number;
    Weight?: number;
    Height?: number;

    GenderID?: number;
    Gender?: GenderInterface;

    ReservationID?: number;
    Reservation?: ReservationInterface;
}