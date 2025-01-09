import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "./ui/sidebar";
import { ChevronDown, LifeBuoy, Send } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const Help = () => {
  return (
    <Collapsible className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Help
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <div className="flex items-center gap-2 px-8 py-1">
            <span>
              <Send size={18} />
            </span>
            Support
          </div>
          <div className="flex items-center gap-2 px-8 py-1">
            <span>
              <LifeBuoy size={18} />
            </span>
            Feedback
          </div>
          <SidebarGroupContent />
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default Help;
