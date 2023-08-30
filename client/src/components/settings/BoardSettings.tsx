import client from "@/lib/prismaDb";
import { BoardAccessPopOver } from "@/components/Popups/BoardAccessPopOver";
import { BoardUserInvitePopOver } from "@/components/Popups/BoardUserInvitePopOver";
import { BoardSheet } from "@/components/sheet/BoardSheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type BoardSettingsProps = {
  boardId: string;
};

export const BoardSettings = async ({ boardId }: BoardSettingsProps) => {
  const boardUser = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    "https://www.goodmorningimagesdownload.com/wp-content/uploads/2020/11/Facebook-Profile-Images-73.jpg",
    "https://1.bp.blogspot.com/-XV-up5R7opo/Xg4BYv-f0wI/AAAAAAAAc_s/ZTMUsmvy8SMyQF6gC6_5xRH9F5issVx6QCLcBGAsYHQ/w720/Beautiful%2BEyes%2BDP%2Bfor%2BFB%2BProfile%2B%25284%2529.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/167/518/desktop-wallpaper-cute-doll-for-facebook-profile-facebook-dp.jpg",
  ];
  const board = await client.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      users: true,
      name: true,
      visibility: true,
    },
  });
  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex items-center gap-x-5">
        <BoardAccessPopOver boardId={boardId} visibility={board.visibility} />
        <div className="flex items-center gap-x-4">
          <div className="hidden sm:flex items-center gap-x-4">
            {boardUser.slice(0, 4).map((user, index) =>
              index < 3 ? (
                index !== 2 ? (
                  <Avatar key={index + user} className="h-10 w-10 rounded-lg">
                    <AvatarImage
                      src={user}
                      alt={"user"}
                      height={40}
                      width={40}
                      loading="lazy"
                    />
                    <AvatarFallback className="rounded-lg">
                      {user}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div key={index + user} className="relative ">
                    <Avatar className="h-10 w-10 rounded-lg">
                      <AvatarImage
                        src={user}
                        alt={"user"}
                        height={40}
                        width={40}
                        loading="lazy"
                      />
                      <AvatarFallback>{user}</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg h-10 w-10 bg-[#BDBDBD]/70  text-[#4F4F4F] ">
                      +{boardUser.length - 3}
                    </div>
                  </div>
                )
              ) : null
            )}
          </div>
          <BoardUserInvitePopOver />
        </div>
      </div>
      <BoardSheet title={board.name} users={boardUser} boardId={boardId} />
    </section>
  );
};
