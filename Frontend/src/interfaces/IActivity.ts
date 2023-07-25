import { BookingInterface } from "./IBooking";

export interface ActivityInterface {
    ID?: number,
    Activity?: string;
    Number?: string;
    Capacity?: number;

    BookingID?: number;
    Booking?: BookingInterface;
}