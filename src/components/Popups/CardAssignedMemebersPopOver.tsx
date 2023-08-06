"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { Icons } from "../Icons";
import { AnimatePresence } from "framer-motion";
import { AssignedMembers } from "./AddUserCardActions";

enum CardAction {
  Members = "Members",
  Labels = "Labels",
  Cover = "Cover",
}

const CardActionBtns = [
  {
    icon: "Users2",
    label: CardAction.Members,
  },
  {
    icon: "Tags",
    label: CardAction.Labels,
  },
  {
    icon: "Wallpaper",
    label: CardAction.Cover,
  },
] satisfies {
  icon: keyof typeof Icons;
  label: CardAction;
}[];

const CardActionJSX = {
  [CardAction.Members]: <AssignedMembers />,
  [CardAction.Labels]: <p>Hello this is Labels</p>,
  [CardAction.Cover]: <p>Hi this is Cover</p>,
} as const;

const ActionInView = ({ action }: { action: CardAction }) => {
  const CurrentActionInView = CardActionJSX[action];
  return <>{CurrentActionInView}</>;
};

export const CardAssignedMembersPopOver = () => {
  const [actionActivate, setActionActivate] = useState<CardAction>();
  return (
    <div className="p-0 relative space-y-2 w-full">
      {CardActionBtns.map((btn, index) => {
        const Icon = Icons[btn.icon];
        return (
          <>
            <Button
              key={index}
              className="flex items-center w-full justify-start gap-x-[10px] text-[#828282] bg-[#F2F2F2] hover:bg-[#F2F2F2] rounded-lg text-sm py-3 px-4"
              onClick={() => setActionActivate(btn.label)}
            >
              <Icon className="h-5 w-5" />
              {btn.label}
            </Button>
            <AnimatePresence initial={false}>
              {actionActivate === btn.label ? (
                <ActionInView action={actionActivate} />
              ) : null}
            </AnimatePresence>
          </>
        );
      })}
    </div>
  );
};
