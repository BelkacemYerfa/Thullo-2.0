import { redirect } from "next/navigation";
import { verifyUserAuth } from "../_actions/board";

export default async function Home() {
  await verifyUserAuth();
  redirect("/board");
}
