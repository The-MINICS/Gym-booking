import { MemberInterface } from "./IMember";
import { PictureInterface } from "./IPicture";
import { RoomInterface } from "./IRoom";

export interface EquipmentInterface {
    ID?: number,
    Name?: string;

    PictureID?: number;
    Picture?: PictureInterface;

    RoomID?: number;
    Room?: RoomInterface;

    MemberID?: number;
    Member?: MemberInterface
}