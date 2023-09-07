import { MemberInterface } from "./IMember";
//import { EquipmentInterface } from "./IEquipment";
import { RoomInterface } from "./IRoom";
import { TimeslotInterface } from "./ITimeslot";

export interface BookingInterface {
    ID?: number,
    Datetime?: Date | null;
    Note?: string;

    MemberID?: number;
    Member?: MemberInterface;

    RoomID?: number;
    Room?: RoomInterface;

    // EquipmentBookingID?: number;
    // EquipmentBooking?: EquipmentInterface;

    TimeslotID?: number;
    Timeslot?: TimeslotInterface;
}