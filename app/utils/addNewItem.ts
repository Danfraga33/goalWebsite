import { NavData } from "~/lib/data/nav";
type NavItem = {
  title: string;
  url: string;
  isActive: boolean;
};

export const addItemToIncome = (newItem: NavItem) => {
  newItem.isActive = true;
};
