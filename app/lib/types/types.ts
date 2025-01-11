export interface Note {
  id: number;
  title: string;
  category: NoteCategory;
  content: string | null;
  createdAt: Date;
  userId: number;
}

export interface JournalEntry {
  date: Date;
  content: string;
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
export enum DaysOfWeeks {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}
export type DailyTask = {
  id: number;
  time: string;
  description: string;
  day: DaysOfWeeks;
  userId: number;
};
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
  Flow = "Flow",
  IncomeOverview = "IncomeOverview",
  InvestOverview = "InvestOverview",
  Dashboard = "Dashboard",
  Education = "Education",
  SaaS = "SaaS",
  Savings = "SavingsAccount",
  ECommerce = "ECommerce",
  Job = "Job",
  Agency = "Agency",
  Dividends = "Dividends",
  RentalIncome = "RentalIncome",
  Tax = "TaxStrategies",
  PublicEquities = "PublicEquities",
  RealEstate = "RealEstate",
  VentureCapital = "VentureCapital",
}
export interface Activity {
  id: string;
  time: string;
  description: string;
}
export interface DaySchedule {
  [key: string]: Activity[];
}
