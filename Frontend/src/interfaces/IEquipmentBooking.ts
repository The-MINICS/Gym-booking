import { EquipmentInterface } from "./IEquipment";
import { EquipmentTimeslotInterface } from "./IEquipmentTimeslot";

export interface EquipmentBookingInterface {
    ID?: number,
    EquipmentDatetime?: Date | null;

    EquipmentBookingID?: number;
    Equipment?: EquipmentInterface;

    EquipmentTimeslotID?: number;
    EquipmentTimeslot?: EquipmentTimeslotInterface;
}