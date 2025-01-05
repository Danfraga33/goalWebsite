export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
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
