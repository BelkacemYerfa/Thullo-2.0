import { UserProfile } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProfilePage() {
  return (
    <main className="h-screen flex items-center justify-center">
      <ScrollArea className="h-full">
        <UserProfile />
      </ScrollArea>
    </main>
  );
}
