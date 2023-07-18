export enum SelectedPage {
    Home = "home",
    Benefits = "benefits",
    SignUp = "signup",
    Booking = "booking",
    Equipments = "equipments",
    ContactUs = "contactus"
}

export interface BenefitType {
    icon: JSX.Element;
    title: string;
    description: string;
}