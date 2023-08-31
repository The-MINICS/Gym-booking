import { MemberInterface } from "./IMember";
import { EquipmentInterface } from "./IEquipment";
import { RoomInterface } from "./IRoom";
import { TimeProportionInterface } from "./ITimeslot";

export interface BookingInterface {
    ID?: number,
    Datetime?: Date | null;

    MemberID?: number;
    Member?: MemberInterface;

    RoomID?: number;
    Room?: RoomInterface;

    EquipmentID?: number;
    Equipment?: EquipmentInterface;

    TimeProportionID?: number;
    TimeProportion?: TimeProportionInterface;
}