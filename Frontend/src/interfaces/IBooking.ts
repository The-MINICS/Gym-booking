import { DateInterface } from "./IDate";
import { MemberInterface } from "./IMember";
import { RoomInterface } from "./IRoom";
import { TimeslotInterface } from "./ITimeslot";
import { StatusInterface } from "./IStatus";

export interface BookingInterface {
    ID?: number,
    Datetime?: Date | null;
    Note?: string;

    MemberID?: number;
    Member?: MemberInterface;

    RoomID?: number;
    Room?: RoomInterface;

    TimeslotID?: number;
    Timeslot?: TimeslotInterface;

    DateID?: number;
    Date?: DateInterface;

    StatusID?: number;
    Status?: StatusInterface;
}