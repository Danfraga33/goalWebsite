export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}
export interface SavingsAccount {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
}

export interface Category {
  id: number;
  title: string;
}
export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}
export interface SaaSProject {
  id: string;
  title: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed";
}

export enum NoteCategory {
  Dashboard = "Dashboard",
  Education = "Education",
  SaaS = "SaaS",
  Savings = "Savings",
  ECommerce = "ECommerce",
  Job = "Job",
  Agency = "Agency",
  Dividends = "Dividends",
  RentalIncome = "RentalIncome",
  Tax = "Tax",
  PublicEquities = "PublicEquities",
  RealEstate = "RealEstate",
  VentureCapital = "VentureCapital",
}
