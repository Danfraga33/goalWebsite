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
import { StudySelector } from "~/components/studySelection";
import { navItems } from "~/lib/constants/CentreOfCompetencyNav";
import { Study } from "@prisma/client";
import { Dispatch, ReactNode } from "react";
const CentreNavTop = ({
  listOfStudies,
  selectedStudy,
  setSelectedStudy,
  addStudy,
  removeStudy,
}: {
  listOfStudies: Study[];
  selectedStudy: string;
  setSelectedStudy: Dispatch<React.SetStateAction<string>>;
  addStudy: () => void;
  removeStudy: (study: string) => void;
}) => {
  return (
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
                    <Link to={`/Centre${item.href}`}>{item.title}</Link>
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
          studies={listOfStudies}
          selectedStudy={selectedStudy}
          onSelectStudy={setSelectedStudy}
          onAddStudy={addStudy}
          onRemoveStudy={removeStudy}
        />
      </div>
    </header>
  );
};

export default CentreNavTop;
