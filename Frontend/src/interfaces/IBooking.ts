import { MemberInterface } from "./IMember";
import { EquipmentInterface } from "./IEquipment";
import { ActivityInterface } from "./IActivity";

export interface BookingInterface {
    ID?: number,
    Datetime?: Date | null;

    MemberID?: number;
    Member?: MemberInterface;

    ActivityID?: number;
    Activity?: ActivityInterface;

    EquipmentID?: number;
    Equipment?: EquipmentInterface;
}