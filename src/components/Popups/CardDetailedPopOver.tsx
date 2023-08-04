import { Drawer } from "vaul";
import Link from "next/link";
import Image from "next/image";

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
        <Drawer.Content className="bg-white rounded-t-[10px] mt-24 fixed max-h-[80%] w-full bottom-0 left-0 right-0">
          <div
            className="p-5 bg-white h-full w-full md:w-[70%] m-auto
          space-y-5 rounded-t-lg md:rounded-none "
          >
            <div className="max-w-full m-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
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
                <div className="basis-3/4">
                  <div className="space-y-2">
                    <h2 className="text-base ">
                      ✋🏿 Move anything that is actually started here
                    </h2>
                    <p className="text-xs text-[#BDBDBD] font-semibold">
                      In list{" "}
                      <span className="text-[#333333]">In Progress</span>
                    </p>
                  </div>
                </div>
                <div className="basis-1/4">hi</div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
