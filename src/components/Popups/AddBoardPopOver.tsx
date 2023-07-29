import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { BoardCreationForm } from "../forms/BoardCreationForm";

export const AddBoardPopOver = () => {
  return (
    <Dialog>
      <DialogTrigger className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-3 py-2 text-sm text-white font-medium">
        + Add
      </DialogTrigger>
      <DialogContent className="p-5">
        <BoardCreationForm />
      </DialogContent>
    </Dialog>
  );
};
