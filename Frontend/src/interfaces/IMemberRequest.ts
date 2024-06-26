import { GenderInterface } from "./IGender";
import { RoleInterface } from "./IRole";
import { StatusInterface } from "./IStatus";


export interface MemberRequestInterface {
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
    OldPassword?: string;
    NewPassword?: string;
    ConfirmNewPassword?: string;
    Attachment?: string;

    GenderID?: number;
    Gender?: GenderInterface;

    RoleID?: number;
    Role?: RoleInterface;

    StatusID?: number;
    Status?: StatusInterface;
}