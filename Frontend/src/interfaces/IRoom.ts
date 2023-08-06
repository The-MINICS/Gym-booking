import { BookingInterface } from "./IBooking";
import { PictureInterface } from "./IPicture";

export interface RoomInterface {
    ID?: number,
    Activity?: string;
    Number?: string;
    Capacity?: number;

    BookingID?: number;
    Booking?: BookingInterface;

    PictureID?: number;
    Picture?: PictureInterface;
}