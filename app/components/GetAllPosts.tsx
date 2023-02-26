"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface GetAllPostsProps {
  id: string;
  name: string;
  avatar: string;
  title: string;
  comments: any[];
}

const GetAllPosts: React.FC<GetAllPostsProps> = ({
  id,
  name,
  avatar,
  title,
  comments,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg my-8 p-8 hover:drop-shadow-sm hover:-translate-y-2 transition-all duration-300 ease-in-out">
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
      <div className="gap-4 flex cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="font-bold text-sm text-gray-700">
            {comments.length} Comments
          </p>
        </Link>
      </div>
    </div>
  );
};

export default GetAllPosts;
