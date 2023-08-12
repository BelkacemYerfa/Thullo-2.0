import { DndContextProvider } from "@/app/context/DndContextProvider";

type BoardDashboardProps = {
  boardId: string;
};

export const BoardDashboard = ({ boardId }: BoardDashboardProps) => {
  return (
    <section className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-xl sm:rounded-t-3xl px-2 pt-2 sm:px-4 sm:pt-4 w-full h-full overflow-y-hidden pb-2 ">
      <DndContextProvider boardId={boardId} />
    </section>
  );
};
