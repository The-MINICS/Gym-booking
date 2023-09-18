import { TimeslotInterface } from "./ITimeslot";

export interface EquipmentTimeslotInterface {
    ID?: number,
    Equipmentslot?: string;

    TimeslotID?: number;
    Timeslot?: TimeslotInterface;
}