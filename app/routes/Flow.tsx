import { useState } from "react";
import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import { GoalCategory } from "~/components/GoalCategory";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import Evernote from "~/components/Evernote";

interface Category {
  id: number;
  title: string;
}

const Flow = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, title: "Personal Goals" },
    { id: 2, title: "Fitness Goals" },
    { id: 3, title: "Financial Goals" },
  ]);

  const addCategory = () => {
    const newId = Math.max(...categories.map((c) => c.id), 0) + 1;
    setCategories([
      ...categories,
      { id: newId, title: `New Category ${newId}` },
    ]);
  };

  const updateCategoryTitle = (id: number, newTitle: string) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, title: newTitle } : category,
      ),
    );
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <PageTitle>My Goals</PageTitle>
          {/* <Button onClick={addCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button> */}
        </div>
        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <GoalCategory
              key={category.id}
              title={category.title}
              onTitleChange={(newTitle) =>
                updateCategoryTitle(category.id, newTitle)
              }
            />
          ))}
        </div> */}
        <Evernote />
      </div>
    </Sidebar>
  );
};

export default Flow;
