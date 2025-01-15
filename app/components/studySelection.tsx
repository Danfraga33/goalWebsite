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
import { Study } from "@prisma/client";

interface StudySelectorProps {
  studies: Study[];
  selectedStudy: Study;
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
          {selectedStudy.title}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {studies.map((study) => (
          <DropdownMenuItem
            key={study.id}
            onSelect={() => onSelectStudy(study.title)}
          >
            <span>{study.title}</span>
            {studies.length > 1 && (
              <Trash2
                className="ml-auto h-4 w-4 cursor-pointer text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveStudy(study.title);
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
