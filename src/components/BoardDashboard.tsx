import { DndContextProvider } from "@/app/context/DndContextProvider";

export const BoardDashboard = () => {
  return (
    <section className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-3xl w-full h-full overflow-y-hidden px-4 pt-4 pb-2 ">
      <DndContextProvider />
    </section>
  );
};
