import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DeleteBtn } from "../Btns";
import { ScrollArea } from "../ui/scroll-area";

const Users = [
  {
    id: crypto.randomUUID(),
    username: "Mikael Stanley",
    profilePic:
      "https://www.goodmorningimagesdownload.com/wp-content/uploads/2020/11/Facebook-Profile-Images-73.jpg",
    comment:
      "“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir Richard Burton",
  },
  {
    id: crypto.randomUUID(),
    username: "Byron Hawkins",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    comment:
      "“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir Richard Burton",
  },
  {
    id: crypto.randomUUID(),
    username: "Byron Hawkins",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    comment:
      "“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir Richard Burton",
  },
];

export const CommentsList = () => {
  return (
    <ul className="h-64">
      <ScrollArea className="h-full w-full px-1">
        <li className="space-y-4 px-2">
          {Users.map((user, index) => (
            <div key={user.id} className="space-y-3">
              <div className="space-y-2">
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-x-3">
                    <Avatar className="rounded-lg">
                      <AvatarImage
                        src={user.profilePic}
                        alt={user.username}
                        loading="lazy"
                      />
                      <AvatarFallback>
                        {user.username.split("")[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">{user.username}</h3>
                      <p className="text-xs font-medium text-[#BDBDBD]">
                        2 days ago
                      </p>
                    </div>
                  </div>
                  <DeleteBtn commentId={user.id} />
                </div>
                <p>{user.comment}</p>
              </div>
              {Users.length - 1 > index ? <hr /> : null}
            </div>
          ))}
        </li>
      </ScrollArea>
    </ul>
  );
};
