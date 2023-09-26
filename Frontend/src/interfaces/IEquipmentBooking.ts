import { BookingInterface } from "./IBooking";
import { EquipmentInterface } from "./IEquipment";
import { EquipmentTimeslotInterface } from "./IEquipmentTimeslot";
import { MemberInterface } from "./IMember";

export interface EquipmentBookingInterface {
    ID?: number,
    EquipmentDatetime?: Date | null;
    Note?: string,

    EquipmentID?: number;
    Equipment?: EquipmentInterface;

    EquipmentTimeslotID?: number;
    EquipmentTimeslot?: EquipmentTimeslotInterface;

    BookingID?: number;
    Booking?: BookingInterface;

    MemberID?: number;
    Member?: MemberInterface;
}