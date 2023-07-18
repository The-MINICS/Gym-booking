import { ReservationInterface } from "./IReservation";

export interface UserInterface {
    ID?: number,
    Equipments?: string;
    Picture?: string;

    ReservationID?: number;
    Reservation?: ReservationInterface;
}