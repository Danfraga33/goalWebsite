import PageTitle from "~/components/PageTitle";
import Sidebar from "~/components/sidebar";
import Evernote from "~/components/Evernote";
import GoalSetting from "~/components/GoalSetting";

const Notes = () => {
  return (
    <Sidebar>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <PageTitle>Education</PageTitle>
        </div>
        <GoalSetting />
        <Evernote />
      </div>
    </Sidebar>
  );
};

export default Notes;
