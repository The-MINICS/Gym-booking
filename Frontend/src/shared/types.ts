export enum SelectedPage {
    Home = "home",
    JoinNow = "joinnow",
    Terms = "terms",
    Equipments = "equipments"
}

export interface BenefitType {
    icon: JSX.Element;
    title: string;
    description: string;
}