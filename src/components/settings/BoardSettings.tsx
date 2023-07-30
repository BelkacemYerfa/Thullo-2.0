import { Icons } from "../Icons";
import { BoardAccessDropDown } from "../dropdowns/BoardAccessDropDown";

export const BoardSettings = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-x-5">
        <BoardAccessDropDown />
      </div>
    </div>
  );
};
