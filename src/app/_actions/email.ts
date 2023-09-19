"use server";

import { Resend } from "resend";
import { verifyUserAuth } from "./board";
import { ThulloInviteEmail } from "@/components/email/ThulloEmail";
import { ThulloInviteEmailProps } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

type ThulloInviteEmail = Pick<
  ThulloInviteEmailProps,
  "username" | "teamName" | "teamImage" | "inviteLink"
>;
export async function sendEmail({
  username,
  teamName,
  teamImage,
  inviteLink,
}: ThulloInviteEmail) {
  const user = await verifyUserAuth();
  const email = user.emailAddresses[0].emailAddress;
  try {
    const response = await resend.sendEmail({
      from: "onboarding@resend.dev",
      to: "belkacem.yerfa@gmail.com",
      subject: "You've been invited to join a board on Thullo",
      text: `Name: ${user.username}\nEmail: ${email}\nMessage: Invite to ${teamName}`,

      react: ThulloInviteEmail({
        username,
        userImage: user.imageUrl ?? "",
        invitedByUsername:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        invitedByEmail: "onboarding@resend.dev",
        teamName,
        teamImage,
        inviteLink,
      }),
    });
    console.log(response);
    return { success: true, response };
  } catch (err) {
    console.log(err);
  }
}
