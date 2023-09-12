import { RoomInterface } from "./IRoom";

export interface TimeslotInterface {
    ID?: number,
    Slot?: string;
    Quantity?: number;

    RoomID?: number;
    Room?: RoomInterface;
}