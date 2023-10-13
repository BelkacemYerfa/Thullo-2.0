import client from "@/lib/prismaDb";
import { BoardAccessPopOver } from "@/components/Popups/BoardAccessPopOver";
import { BoardUserInvitePopOver } from "@/components/Popups/BoardUserInvitePopOver";
import { BoardSheet } from "@/components/sheet/BoardSheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Visibility } from "@prisma/client";
import { getBoardColleagues } from "@/app/_actions/board";

type BoardSettingsProps = {
  boardId: string;
};

export const BoardSettings = async ({ boardId }: BoardSettingsProps) => {
  const boardUser = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    "https://1.bp.blogspot.com/-XV-up5R7opo/Xg4BYv-f0wI/AAAAAAAAc_s/ZTMUsmvy8SMyQF6gC6_5xRH9F5issVx6QCLcBGAsYHQ/w720/Beautiful%2BEyes%2BDP%2Bfor%2BFB%2BProfile%2B%25284%2529.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/167/518/desktop-wallpaper-cute-doll-for-facebook-profile-facebook-dp.jpg",
  ];
  const board = await client.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      name: true,
      visibility: true,
    },
  });
  const data: any = await getBoardColleagues();
  console.log(data.Colleagues);
  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <BoardAccessPopOver
          boardId={boardId}
          visibility={board?.visibility ?? Visibility.PUBLIC}
        />
        <div className="flex items-center gap-x-4">
          <div className="hidden sm:flex items-center gap-3">
            {boardUser.slice(0, 3).map((user, index) =>
              index <= 2 ? (
                index !== 2 ? (
                  <Avatar key={index + user} className="h-9 w-9 rounded-lg">
                    <AvatarImage
                      src={user}
                      alt={"user"}
                      height={36}
                      width={32}
                      loading="lazy"
                    />
                    <AvatarFallback className="rounded-lg">
                      {user}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div key={index + user} className="relative ">
                    <Avatar className="h-9 w-9 rounded-lg">
                      <AvatarImage
                        src={user}
                        alt={"user"}
                        height={36}
                        width={36}
                        loading="lazy"
                      />
                      <AvatarFallback className="rounded-lg">
                        {user}
                      </AvatarFallback>
                    </Avatar>
                    {boardUser.length > 3 ? (
                      <div className="absolute inset-0 flex items-center justify-center rounded-lg h-9 w-9 bg-[#BDBDBD]/70  text-[#4F4F4F] ">
                        +{boardUser.length - 3}
                      </div>
                    ) : null}
                  </div>
                )
              ) : null
            )}
          </div>
          <BoardUserInvitePopOver Colleagues={[]} />
        </div>
      </div>

      <BoardSheet
        title={board?.name ?? ""}
        users={boardUser}
        boardId={boardId}
      />
    </section>
  );
};
