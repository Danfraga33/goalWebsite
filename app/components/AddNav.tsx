import { Plus } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { NavData } from "~/lib/data/nav";
import { addItemToIncome } from "~/utils/addNewItem";

const AddNav = () => {
  const navData = NavData.navMain;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus />
          Add
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {navData.map((item) =>
          item.items.map((subitem) => (
            <DropdownMenuGroup key={subitem.title}>
              <DropdownMenuCheckboxItem
                onClick={() => addItemToIncome(subitem)}
                checked={subitem.isActive}
              >
                {subitem.title}
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          )),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddNav;
