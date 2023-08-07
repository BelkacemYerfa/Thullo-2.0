import { Drawer } from "vaul";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { CardDescriptionForm } from "../forms/CardDescriptionForm";
import { ScrollArea } from "../ui/scroll-area";
import { CardCommentForm } from "../forms/CardCommentForm";
import { CommentsList } from "../list/CommentsList";
import { Icons } from "../Icons";
import { CardAssignedMembers } from "./AddUserCardActions";
import { CardCoverPopOver } from "./CardCoverPopOver";
import { CardLabelsPopOver } from "./CardLabelsPopOver";

type CardDetailedPopOverProps = {
  taskTitle: string;
  cardId: string;
};

export const CardDetailedPopOver = ({
  taskTitle,
  cardId,
}: CardDetailedPopOverProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Drawer.Root>
      <Link href={`?card=${cardId}`}>
        <Drawer.Trigger className="cursor-pointer">{taskTitle}</Drawer.Trigger>
      </Link>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed z-[5] inset-0 bg-black/40 " />
        <Drawer.Content className="bg-white/90 backdrop-blur-sm absolute z-[7] h-[85%] md:h-[90%] w-full bottom-0 left-0 right-0 rounded-t-xl overflow-hidden ">
          <ScrollArea className="h-full w-full ">
            <div className=" h-full pb-4 bg-white w-full md:w-3/5 m-auto shadow-outline-black ">
              <div className="sticky top-0 flex justify-center bg-white py-4 shadow-outline-black z-[5] ">
                <Link href={pathname.split("?")[0]}>
                  <Drawer.Close>
                    <div className="max-w-full mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
                  </Drawer.Close>
                </Link>
              </div>
              <div className="px-4 w-full max-h-full space-y-6 mt-2 ">
                <Image
                  src={
                    "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                  }
                  alt="pic"
                  height={200}
                  width={200}
                  className="w-full h-[200px] rounded-xl object-cover "
                  quality={100}
                />
                <div className="flex flex-col-reverse md:flex-row gap-5">
                  <div className=" basis-full md:basis-3/4 space-y-5 ">
                    <div className="space-y-2">
                      <Drawer.Title className="text-base ">
                        {taskTitle}
                      </Drawer.Title>
                      <p className="text-xs text-[#BDBDBD] font-semibold">
                        In list{" "}
                        <span className="text-[#333333]">In Progress</span>
                      </p>
                    </div>
                    <CardDescriptionForm />
                    <div className="space-y-4">
                      <CardCommentForm />
                      <CommentsList />
                    </div>
                  </div>
                  <div className="basis-full md:basis-1/4 space-y-2">
                    <h3 className="flex items-center text-xs gap-x-2 text-[#BDBDBD] font-semibold">
                      <Icons.User2 className="h-4 w-4" />
                      Actions
                    </h3>
                    <div className="flex flex-row items-center md:flex-col gap-3 ">
                      <div className="p-0 relative flex md:block items-center md:space-y-2 gap-x-2 w-full">
                        <CardAssignedMembers />
                        <CardLabelsPopOver />
                        <CardCoverPopOver />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
