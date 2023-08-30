import { redirect } from "next/navigation";
import { verifyUserAuth } from "../_actions/board";

export default async function Home() {
  const user = await verifyUserAuth();
  if (user) redirect("/board");
}
