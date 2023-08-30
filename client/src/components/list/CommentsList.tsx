import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DeleteBtn } from "@/components/Btns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getComments } from "@/app/_actions/card";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

type CommentsListProps = {
  cardId: string;
};

export const CommentsList = ({ cardId }: CommentsListProps) => {
  const { user } = useUser();
  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery(["comments"], async () => {
    return await getComments(cardId);
  });
  return (
    <ul className="h-64">
      <ScrollArea className="h-full w-full px-1">
        <li className="space-y-4 px-2">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="w-full flex gap-2">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="w-full space-y-1">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-48 h-4" />
                  </div>
                </div>
                <div className="w-full">
                  <Skeleton className="w-full h-6" />
                </div>
              </div>
            ))
          ) : comments?.length !== 0 ? (
            comments?.map((comment, index) => (
              <div key={comment.id} className="space-y-3">
                <div className="space-y-2">
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-x-3">
                      <Avatar className="rounded-lg">
                        <AvatarImage
                          src={comment.user.image}
                          alt={comment.user.name}
                          loading="lazy"
                          className="w-full object-cover"
                        />
                        <AvatarFallback>
                          {comment.user.name.split("")[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">
                          {comment.user.name}
                        </h3>
                        <p className="text-xs font-medium text-[#BDBDBD]">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {user?.id === comment.user.id ? (
                      <DeleteBtn commentId={comment.id} cardId={cardId} />
                    ) : null}
                  </div>
                  <p>{comment.text}</p>
                </div>
                {comments.length - 1 > index ? <hr /> : null}
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment on this card.</p>
          )}
        </li>
      </ScrollArea>
    </ul>
  );
};
