import { RoomInterface } from "./IRoom";

export interface DateInterface {
    ID?: number,
    DateCode?: string;
    Date?: Date | null;

    RoomID?: number;
    Room?: RoomInterface;
}