import { MemberInterface } from "./IMember";

export interface ContactUsInterface {
    ID?: number,
    Subject?: string;
    Message?: string;

    MemberID?: number;
    Member?: MemberInterface;
}