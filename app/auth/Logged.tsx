"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { SunIcon, MoonIcon } from "../components/icons";
import { useStore } from "../store";

const Logged = ({ session }: { session: Session }) => {
  const { setTheme, isDark } = useStore((state) => state);

  return (
    <li className="flex gap-2 items-center flex-wrap">
      <IconButton onClick={setTheme}>
        {isDark ? <SunIcon color={"#cbaf3c"} /> : <MoonIcon />}
      </IconButton>
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
