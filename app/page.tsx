"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import AddPost from "./components/AddPost";
import GetAllPosts from "./components/GetAllPosts";
import { getAllPosts } from "./endpoints/getAllPosts";
import SkeletonPostLoader from "./components/SkeletonPostLoader";
import { PostType } from "./types";

export default function Home() {
  const { data, isLoading, error } = useQuery<PostType[]>(
    ["posts"],
    getAllPosts
  );

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
        <SkeletonPostLoader />
      ) : (
        data?.map((post) => (
          <GetAllPosts
            key={post.id}
            name={post.user?.name!}
            avatar={post.user?.image!}
            title={post.title}
            comments={post.comments!}
            id={post.id}
          />
        ))
      )}
    </main>
  );
}
