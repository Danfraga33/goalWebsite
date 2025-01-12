import * as React from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface StudySelectorProps {
  studies: string[];
  selectedStudy: string;
  onSelectStudy: (study: string) => void;
  onAddStudy: () => void;
  onRemoveStudy: (study: string) => void;
}

export function StudySelector({
  studies,
  selectedStudy,
  onSelectStudy,
  onAddStudy,
  onRemoveStudy,
}: StudySelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selectedStudy}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {studies.map((study) => (
          <DropdownMenuItem key={study} onSelect={() => onSelectStudy(study)}>
            <span>{study}</span>
            {studies.length > 1 && (
              <Trash2
                className="ml-auto h-4 w-4 cursor-pointer text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveStudy(study);
                }}
              />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onAddStudy}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Add New Study</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
