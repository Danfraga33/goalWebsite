export interface Startup {
  id: string;
  name: string;
  industry: string;
  fundingStage: string;
  valuation: string;
  notes: string;
}
export const VentureCapitalDeals: Startup[] = [
  {
    id: "1",
    name: "EcoTech Solutions",
    industry: "Clean Energy",
    fundingStage: "Series A",
    valuation: "$15M",
    notes:
      "EcoTech Solutions is developing innovative solar panel technology that promises to increase efficiency by 30%. Their team has a strong background in materials science and has already secured key patents. Potential for significant market disruption, but faces challenges in scaling manufacturing.",
  },
  {
    id: "2",
    name: "HealthAI",
    industry: "Healthcare",
    fundingStage: "Seed",
    valuation: "$5M",
    notes:
      "HealthAI is creating an AI-powered diagnostic tool for early detection of rare diseases. The founders have impressive credentials in machine learning and medicine. Early trials show promising results, but regulatory approval will be a significant hurdle. Strong potential for partnerships with major healthcare providers.",
  },
  {
    id: "3",
    name: "QuantumCompute",
    industry: "Quantum Computing",
    fundingStage: "Series B",
    valuation: "$100M",
    notes:
      "QuantumCompute is at the forefront of developing practical quantum computing solutions. They've achieved significant milestones in qubit stability and error correction. The market potential is enormous, but the technology is still in early stages. Strong competition from tech giants, but QuantumCompute has unique IP that could give them an edge.",
  },
];
