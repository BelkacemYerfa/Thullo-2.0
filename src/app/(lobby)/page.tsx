import { BoardCard } from "@/components/card/BoardCard";
import { NavBar } from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="min-h-screen gap-x-2 p-1 w-full">
      <NavBar user={user} />
      <section className="max-w-[80%] m-auto pt-10 space-y-7 ">
        <div className="w-full flex items-center justify-between px-2">
          <h2 className="text-[#333333] font-medium text-lg">All Boards</h2>
          <Button className="bg-[#2F80ED] rounded-lg font-sm px-3 py-2">
            + Add
          </Button>
        </div>
        <div className="flex items-center justify-center xl:justify-start w-full flex-wrap gap-x-8 gap-y-7">
          <BoardCard
            boardBanner="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
            title="DeveChallenges BOARD "
            usersPics={[
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
              "https://www.goodmorningimagesdownload.com/wp-content/uploads/2020/11/Facebook-Profile-Images-73.jpg",
              "https://1.bp.blogspot.com/-XV-up5R7opo/Xg4BYv-f0wI/AAAAAAAAc_s/ZTMUsmvy8SMyQF6gC6_5xRH9F5issVx6QCLcBGAsYHQ/w720/Beautiful%2BEyes%2BDP%2Bfor%2BFB%2BProfile%2B%25284%2529.jpg",
              "https://e1.pxfuel.com/desktop-wallpaper/167/518/desktop-wallpaper-cute-doll-for-facebook-profile-facebook-dp.jpg",
            ]}
            boardId="1"
          />
        </div>
      </section>
    </main>
  );
}
