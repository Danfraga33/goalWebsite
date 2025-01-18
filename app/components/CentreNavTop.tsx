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
import { Study, StudyCategory } from "@prisma/client";
import { Dispatch } from "react";
import { ModeToggle } from "./mode-toggle";

interface SubCategory {
  title: string;
  description: string;
  id: number;
  studyCategoryId: number;
  studyCategoryName: string;
}
interface Category {
  id: number;
  title: string;
  userId: number;
  subCategories: SubCategory[];
}
const CentreNavTop = ({
  listOfStudies,
  selectedStudy,
  setSelectedStudy,
  addStudy,
  removeStudy,
  studyCategory,
}: {
  listOfStudies: Study[];
  selectedStudy: string;
  setSelectedStudy: Dispatch<React.SetStateAction<string>>;
  addStudy: () => void;
  removeStudy: (study: string) => void;
  studyCategory: Category[];
}) => {
  const selectedCategory = studyCategory.filter((category) => {
    return category.title === selectedStudy;
  });
  console.log(selectedCategory);

  const filteredNav = navItems.filter((navItem) => navItem.active === true);
  return (
    <header className="sticky top-0 z-50 w-full gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-center">
        {/* Center nav container */}
        <NavigationMenu>
          <NavigationMenuList>
            <Link to="/General">
              <Home />
            </Link>
            <EllipsisVertical />
            {selectedCategory.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.subCategories ? (
                  <NavigationMenuTrigger>
                    <div>{item.title}</div>
                  </NavigationMenuTrigger>
                ) : (
                  <Link to={item.title}>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                )}
                {item.subCategories && (
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.subCategories.map((category) => (
                        <li key={category.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href="#"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              {category.title}
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
        <section className="flex gap-4">
          <StudySelector
            studies={listOfStudies}
            selectedStudy={selectedStudy}
            onSelectStudy={setSelectedStudy}
            onAddStudy={addStudy}
            onRemoveStudy={removeStudy}
          />
          <ModeToggle />
        </section>
      </div>
    </header>
  );
};

export default CentreNavTop;
