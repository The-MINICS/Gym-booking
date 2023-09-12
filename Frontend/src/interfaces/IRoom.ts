import { BookingInterface } from "./IBooking";

export interface RoomInterface {
    ID?: number,
    Activity?: string;
    Number?: string;
    // Quantity?: number;
    Capacity?: number;
    Attendant?: string;
    Illustration?: string;
    Caption?: string;

    BookingID?: number;
    Booking?: BookingInterface;
}