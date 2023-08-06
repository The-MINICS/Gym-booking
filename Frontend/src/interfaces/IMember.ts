import { GenderInterface } from "./IGender";
import { RoleInterface } from "./IRole";

export interface MemberInterface {
    ID?: number,
    Username?: string;
    Email?: string;
    Password?: string;
    Firstname?: string;
    Lastname?: string;
    Phonenumber?: string
    Age?: number;
    Weight?: number;
    Height?: number;
    Member_datetime?: Date | null;

    GenderID?: number;
    Gender?: GenderInterface;

    RoleID?: number;
    Role?: RoleInterface;
}