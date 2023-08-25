import { Icons } from "../Icons";
import { Skeleton } from "../ui/skeleton";

export const NavLoader = () => {
  return (
    <nav className=" sticky top-0 z-[3] backdrop-blur-sm bg-white/80 w-full shadow-outline-navigation ">
      <div className="w-full ">
        <div className="flex items-center w-full gap-x-6 py-2 px-3 md:py-3 md:px-6">
          <div className="flex items-center justify-between w-1/3 ">
            <Icons.logo />
          </div>

          <div className={`flex items-center justify-end  w-2/3`}>
            <div className="flex items-center gap-x-5 md:gap-x-7">
              <Skeleton className="w-40 xl:w-80 h-10 " />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </nav>
  );
};
