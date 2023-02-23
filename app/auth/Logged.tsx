"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import { useStore } from "../store";

const Logged = ({ session }: { session: Session }) => {
  const setTheme = useStore((state) => state.setTheme);

  return (
    <li className="flex gap-2 items-center">
      <Button onClick={setTheme}>Toggle</Button>
      <Button onClick={() => signOut()}>Sign out</Button>
      <Link href="/dashboard">
        <Image
          src={session!.user?.image!}
          alt={session!.user?.name!}
          width={48}
          height={48}
          className="rounded-full hover:shadow-sm"
          priority
        />
      </Link>
    </li>
  );
};

export default Logged;
