import Image from "next/image";
import { BoardAccessPopOver } from "../Popups/BoardAccessPopOver";
import { BoardUserInvitePopOver } from "../Popups/BoardUserInvitePopOver";
import { BoardSheet } from "../sheet/BoardSheet";

export const BoardSettings = ({}) => {
  const boardUser = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    "https://www.goodmorningimagesdownload.com/wp-content/uploads/2020/11/Facebook-Profile-Images-73.jpg",
    "https://1.bp.blogspot.com/-XV-up5R7opo/Xg4BYv-f0wI/AAAAAAAAc_s/ZTMUsmvy8SMyQF6gC6_5xRH9F5issVx6QCLcBGAsYHQ/w720/Beautiful%2BEyes%2BDP%2Bfor%2BFB%2BProfile%2B%25284%2529.jpg",
    "https://e1.pxfuel.com/desktop-wallpaper/167/518/desktop-wallpaper-cute-doll-for-facebook-profile-facebook-dp.jpg",
  ];
  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex items-center gap-x-5">
        <BoardAccessPopOver />
        <div className="flex items-center gap-x-4">
          {boardUser.map((user, index) =>
            index < 3 ? (
              index !== 2 ? (
                <Image
                  key={index}
                  src={user}
                  alt="user"
                  height={40}
                  width={40}
                  className="rounded-lg"
                  quality={100}
                />
              ) : (
                <div key={index} className="relative ">
                  <Image
                    src={user}
                    alt="user"
                    height={40}
                    width={40}
                    className="rounded-lg"
                    quality={100}
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg h-10 w-10 bg-[#BDBDBD]/70  text-[#4F4F4F] ">
                    +{boardUser.length - 3}
                  </div>
                </div>
              )
            ) : null
          )}
          <BoardUserInvitePopOver />
        </div>
      </div>
      <BoardSheet />
    </section>
  );
};
