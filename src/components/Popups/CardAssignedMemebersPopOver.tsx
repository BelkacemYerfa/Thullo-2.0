import { AssignedMembers } from "./AddUserCardActions";
import { CardCoverPopOver } from "./CardCoverPopOver";
import { CardLabelsPopOver } from "./CardLabelsPopOver";

export const CardAssignedMembersPopOver = () => {
  return (
    <div className="p-0 relative flex md:block items-center md:space-y-2 gap-x-2 w-full">
      <AssignedMembers />
      <CardLabelsPopOver />
      <CardCoverPopOver />
    </div>
  );
};
