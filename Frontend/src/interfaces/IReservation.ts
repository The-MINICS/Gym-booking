import { UserInterface } from "./IUser";

export interface ReservationInterface {
    ID?: number;
    Datetime?: Date | null;

    UserID?: number;
    User?: UserInterface;
}