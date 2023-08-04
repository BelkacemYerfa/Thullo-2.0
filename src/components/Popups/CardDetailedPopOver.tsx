import { Drawer } from "vaul";
import Link from "next/link";
import Image from "next/image";
import { CardDescriptionForm } from "../forms/CardDescriptionForm";
import { ScrollArea } from "../ui/scroll-area";

type CardDetailedPopOverProps = {
  taskTitle: string;
};

export const CardDetailedPopOver = ({
  taskTitle,
}: CardDetailedPopOverProps) => {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger>{taskTitle}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 " />
        <Drawer.Content className="bg-white rounded-t-[10px] mt-24 fixed h-[80%] w-full bottom-0 left-0 right-0 px-1">
          <ScrollArea className="h-full w-full">
            <div className="sticky top-0 max-w-full bg-white py-5 ">
              <div className=" max-w-full m-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
            </div>
            <div
              className="px-4 pb-4 bg-white h-full w-full md:w-[70%] m-auto
           rounded-t-lg md:rounded-none "
            >
              <div className="w-full space-y-6 ">
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
                <div className="flex gap-x-5">
                  <div className="basis-3/4 space-y-3 ">
                    <div className="space-y-2">
                      <Drawer.Title className="text-base ">
                        ✋🏿 Move anything that is actually started here
                      </Drawer.Title>
                      <p className="text-xs text-[#BDBDBD] font-semibold">
                        In list{" "}
                        <span className="text-[#333333]">In Progress</span>
                      </p>
                    </div>
                    <CardDescriptionForm />
                    <div></div>
                  </div>
                  <div className="basis-1/4">hi</div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
