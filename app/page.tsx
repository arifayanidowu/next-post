"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import AddPost from "./components/AddPost";
import GetAllPosts from "./components/GetAllPosts";
import { getAllPosts, Post } from "./endpoints/getAllPosts";

export default function Home() {
  const { data, isLoading, error } = useQuery<Post[]>(["posts"], getAllPosts);

  useEffect(() => {
    if (error) {
      toast.error((error as { message: string }).message);
    }
  }, [error]);

  return (
    <main>
      <AddPost />
      <h2 className="divide-y divide-solid">Posts</h2>
      {isLoading ? (
        <div className="p-8 my-8 h-44 bg-white dark:bg-slate-800 items-center rounded-lg">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-400 h-8 w-8 animate-pulse"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-slate-400 rounded w-1/5 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-400 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        data?.map((post) => (
          <GetAllPosts
            key={post.id}
            name={post.user?.name!}
            avatar={post.user?.image!}
            title={post.title}
          />
        ))
      )}
    </main>
  );
}
