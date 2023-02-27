import Link from "next/link";
import Login from "./Login";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth/next";
import Logged from "./Logged";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8 flex-wrap">
      <Link href="/">
        <h1 className="font-bold text-lg">SendIt </h1>
      </Link>
      <ul className="flex item-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <Logged session={session} />}
      </ul>
    </nav>
  );
}
