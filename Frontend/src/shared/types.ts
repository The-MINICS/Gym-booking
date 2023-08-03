export enum SelectedPage {
    Home = "home",
    Benefits = "benefits",
    JoinNow = "joinnow",
    Terms = "terms",
    Equipments = "equipments"
}

export interface BenefitType {
    icon: JSX.Element;
    title: string;
    description: string;
}