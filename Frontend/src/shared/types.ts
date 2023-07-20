export enum SelectedPage {
    Home = "home",
    Benefits = "benefits",
    SignIn = "signin",
    Booking = "booking",
    Equipments = "equipments",
    ContactUs = "contactus",
    OurClass = "ourclass",
    Terms = "terms",
    SignUp = "signup"
}

export interface BenefitType {
    icon: JSX.Element;
    title: string;
    description: string;
}