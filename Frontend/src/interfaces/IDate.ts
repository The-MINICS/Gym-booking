import { RoomInterface } from "./IRoom";

export interface DateInterface {
    ID?: number,
    DateCode?: Date | null;

    RoomID?: number;
    Room?: RoomInterface;
}