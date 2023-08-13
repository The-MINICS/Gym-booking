import { BookingInterface } from "./IBooking";
import { PictureInterface } from "./IPicture";

export interface RoomInterface {
    ID?: number,
    Activity?: string;
    Number?: string;
    Capacity?: number;
    Illustration?: string;
    Caption?: string;

    BookingID?: number;
    Booking?: BookingInterface;

    PictureID?: number;
    Picture?: PictureInterface;
}