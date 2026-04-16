import { redirect } from "next/navigation";

export default function EmailConfirmedPage() {
  redirect("/auth?confirmed=1");
}