import { BookingInterface } from "./IBooking";
import { EquipmentInterface } from "./IEquipment";
import { EquipmentTimeslotInterface } from "./IEquipmentTimeslot";
import { StatusInterface } from "./IStatus";

export interface EquipmentBookingInterface {
    ID?: number,
    EquipmentDatetime?: Date | null;
    EquipmentNote?: string,

    EquipmentID?: number;
    Equipment?: EquipmentInterface;

    EquipmentTimeslotID?: number;
    EquipmentTimeslot?: EquipmentTimeslotInterface;

    BookingID?: number;
    Booking?: BookingInterface;

    StatusID?: number;
    Status?: StatusInterface;
}