import { MemberInterface } from "./IMember";
import { PictureInterface } from "./IPicture";
import { RoomInterface } from "./IRoom";
import { StatusInterface } from "./IStatus";

export interface EquipmentInterface {
    ID?: number,
    Name?: string;

    PictureID?: number;
    Picture?: PictureInterface;

    RoomID?: number;
    Room?: RoomInterface;

    MemberID?: number;
    Member?: MemberInterface;

    StatusID?: number;
    Status?: StatusInterface;
}