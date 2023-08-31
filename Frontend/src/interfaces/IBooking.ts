import { MemberInterface } from "./IMember";
import { EquipmentInterface } from "./IEquipment";
import { RoomInterface } from "./IRoom";
import { TimeslotInterface } from "./ITimeslot";

export interface BookingInterface {
    ID?: number,
    Datetime?: Date | null;

    MemberID?: number;
    Member?: MemberInterface;

    RoomID?: number;
    Room?: RoomInterface;

    EquipmentID?: number;
    Equipment?: EquipmentInterface;

    TimeslotID?: number;
    Timeslot?: TimeslotInterface;
}