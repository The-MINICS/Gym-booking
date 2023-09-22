import { RoomInterface } from "./IRoom";

export interface DateInterface {
    ID?: number,
    DateID?: string;
    Date?: Date | null;

    RoomID?: number;
    Room?: RoomInterface;
}