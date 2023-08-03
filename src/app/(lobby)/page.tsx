import { AddBoardPopOver } from "@/components/Popups/AddBoardPopOver";
import { BoardCard } from "@/components/card/BoardCard";
import { NavBar } from "@/components/navigation/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="min-h-screen w-full flex flex-col">
      <NavBar user={user} />
      <ScrollArea className="h-full w-full">
        <section className="flex-1 max-w-[80%] m-auto pt-10 space-y-7 ">
          <div className="w-full flex items-center justify-between px-2">
            <h2 className="text-[#333333] font-medium text-lg">All Boards</h2>
            <AddBoardPopOver />
          </div>
          <div className="flex items-center justify-center w-full flex-wrap gap-x-8 gap-y-7 pb-5">
            {[...Array(20)].map((_, i) => (
              <BoardCard
                key={i}
                boardBanner="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                title="DeveChallenges BOARD "
                usersPics={[
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
                  "https://www.goodmorningimagesdownload.com/wp-content/uploads/2020/11/Facebook-Profile-Images-73.jpg",
                  "https://1.bp.blogspot.com/-XV-up5R7opo/Xg4BYv-f0wI/AAAAAAAAc_s/ZTMUsmvy8SMyQF6gC6_5xRH9F5issVx6QCLcBGAsYHQ/w720/Beautiful%2BEyes%2BDP%2Bfor%2BFB%2BProfile%2B%25284%2529.jpg",
                  "https://e1.pxfuel.com/desktop-wallpaper/167/518/desktop-wallpaper-cute-doll-for-facebook-profile-facebook-dp.jpg",
                ]}
                boardId={i.toString()}
              />
            ))}
          </div>
        </section>
        {/* <div className=" flex items-center justify-center w-full  gap-2 py-5 bg-[#2F80ED] text-white ">
          Made with ❤️ by
          <Link
            href={"https://github.com/BelkacemYerfa"}
            className="font-semibold"
          >
            Belkacem Yerfa
          </Link>
        </div> */}
      </ScrollArea>
    </main>
  );
}
