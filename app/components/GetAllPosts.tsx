"use client";

import Image from "next/image";
import React from "react";

interface GetAllPostsProps {
  name: string;
  avatar: string;
  title: string;
}

const GetAllPosts: React.FC<GetAllPostsProps> = ({ name, avatar, title }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg my-8 p-8 hover:shadow-md hover:-translate-y-2 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-2">
        <Image
          src={avatar}
          className="rounded-full"
          width={32}
          height={32}
          alt={name}
        />
        <h3 className="font-bold">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{title}</p>
      </div>
    </div>
  );
};

export default GetAllPosts;
