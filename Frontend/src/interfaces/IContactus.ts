import { MemberInterface } from "./IMember";
import { StatusInterface } from "./IStatus";

export interface ContactUsInterface {
    ID?: number,
    Subject?: string;
    Message?: string;

    MemberID?: number;
    Member?: MemberInterface;

    StatusID?: number;
    Status?: StatusInterface;
}