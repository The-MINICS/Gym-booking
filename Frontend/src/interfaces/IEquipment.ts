import { PictureInterface } from "./IPicture";

export interface EquipmentInterface {
    ID?: number,
    Equipments?: string;

    PictureID?: number;
    Picture?: PictureInterface;
}