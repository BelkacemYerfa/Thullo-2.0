import { deleteLabel, getLabels } from "@/app/_actions/card";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "../ui/badge";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { labels } from "@/types";

type CardLabelsListProps = {
  cardId: string;
  labels: labels[];
};

export const CardLabelsList = ({ cardId, labels }: CardLabelsListProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleDeleteLabel = (id: string) => {
    startTransition(async () => {
      try {
        await deleteLabel(id, cardId);
        toast.error("Label deleted successfully");
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    labels?.length !== 0 && (
      <div className="space-y-2">
        {false ? (
          <>
            <Skeleton className="h-4 w-20" />
            <ul className="flex items-center gap-2 flex-wrap w-full">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-20 rounded-xl" />
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3 className="flex items-center gap-[0.375rem] text-[#BDBDBD]">
              <Icons.Tags className="w-4 h-4 " />
              <span className="text-xs font-semibold">Labels</span>
            </h3>
            {labels && labels.length !== 0 && (
              <ul className="flex items-center gap-2 flex-wrap w-full">
                {labels.map((label) => (
                  <li key={label.id} className="relative">
                    <Badge
                      className={`text-xs font-semibold px-2 py-1 rounded-xl text-white`}
                      style={{ backgroundColor: label.color }}
                    >
                      {label.name}
                    </Badge>
                    <Button
                      size={"icon"}
                      aria-label="delete label button"
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#EB5757] "
                      onClick={() => handleDeleteLabel(label.id)}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Icons.Loader2 className="w-3 h-3 animate-spin " />
                      ) : (
                        <Icons.X className="w-3 h-3" />
                      )}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    )
  );
};
