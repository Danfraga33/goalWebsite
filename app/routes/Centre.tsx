import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { Link } from "@remix-run/react";
import { EllipsisVertical, Home } from "lucide-react";
import { useState } from "react";
import { StudySelector } from "~/components/studySelection";

const navItems = [
  {
    title: "Fundamentals",
    href: "/fundamentals",
    subItems: [
      "Market Types & Structures",
      "Valuation Techniques",
      "Risk Assessment Methods",
    ],
  },
  {
    title: "Demand Dynamics",
    href: "/demand-dynamics",
    subItems: [
      "Consumer Behavior Analysis",
      "Market Segmentation",
      "Supply & Demand Curves",
    ],
  },
  {
    title: "Supply Dynamics",
    href: "/supply-dynamics",
    subItems: [
      "Production Costs & Efficiency",
      "Supply Chain Management",
      "Market Entry Barriers",
    ],
  },
  {
    title: "Technological Advancements",
    href: "/technological-advancements",
    subItems: [
      "Tech Disruption & Investment Opportunities",
      "Patent Analysis for Investment",
      "Tech Market Penetration Strategies",
    ],
  },
  {
    title: "Economic Impact",
    href: "/economic-impact",
    subItems: [
      "Global Economic Trends",
      "Macroeconomic Indicators",
      "Interest Rates & Inflation Impact on Investments",
    ],
  },
  {
    title: "Risks and Challenges",
    href: "/risks-and-challenges",
    subItems: [
      "Market Volatility & Crisis Management",
      "Geopolitical Risks",
      "Legal & Regulatory Risks",
    ],
  },
  {
    title: "Investment Framework",
    href: "/investment-framework",
    subItems: [
      "Investment Portfolio Diversification",
      "Investment Strategies & Techniques",
      "Asset Allocation & Risk Management",
    ],
  },
];

export default function IndustryInsightsDashboard() {
  const [studies, setStudies] = useState(["AI Insights"]);
  const [selectedStudy, setSelectedStudy] = useState("AI Insights");

  const addStudy = () => {
    const newStudy = `Study ${studies.length + 1}`;
    setStudies([...studies, newStudy]);
    setSelectedStudy(newStudy);
  };

  const removeStudy = (study: string) => {
    if (studies.length > 1) {
      const newStudies = studies.filter((s) => s !== study);
      setStudies(newStudies);
      setSelectedStudy(newStudies[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-2">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-center">
            {/* Center nav container */}
            <NavigationMenu>
              <NavigationMenuList>
                <Link to="/Dashboard">
                  <Home />
                </Link>
                <EllipsisVertical />
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.subItems ? (
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                    ) : (
                      <Link to={item.href}>
                        <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    )}
                    {item.subItems && (
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.subItems.map((subItem) => (
                            <li key={subItem}>
                              <NavigationMenuLink asChild>
                                <a
                                  href="#"
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  {subItem}
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <StudySelector
              studies={studies}
              selectedStudy={selectedStudy}
              onSelectStudy={setSelectedStudy}
              onAddStudy={addStudy}
              onRemoveStudy={removeStudy}
            />
          </div>
        </header>
        <main className="flex-1">
          <div className="container flex justify-center py-6">
            {" "}
            {/* Center the main content */}
            <div className="w-full max-w-7xl">
              {" "}
              {/* Add max width to avoid too wide content */}
              <h1 className="mb-6 text-3xl font-bold">
                Industry Insights Dashboard: {selectedStudy}
              </h1>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <DashboardCard title="Market Overview">
                  <p>Key market statistics and trends for {selectedStudy}</p>
                </DashboardCard>
                <DashboardCard title="Top Performers">
                  <p>Leading companies in the {selectedStudy} sector</p>
                </DashboardCard>
                <DashboardCard title="Latest News">
                  <p>Recent {selectedStudy} industry developments</p>
                </DashboardCard>
                <DashboardCard title="Key Metrics">
                  <p>
                    Important financial and growth indicators for{" "}
                    {selectedStudy}
                  </p>
                </DashboardCard>
                <DashboardCard title="Industry Reports">
                  <p>In-depth analysis and forecasts for {selectedStudy}</p>
                </DashboardCard>
                <DashboardCard title="Emerging Trends">
                  <p>New technologies and market shifts in {selectedStudy}</p>
                </DashboardCard>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  );
}
