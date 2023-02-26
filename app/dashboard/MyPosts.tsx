"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SkeletonPostLoader from "../components/SkeletonPostLoader";
import { getAuthPosts } from "../endpoints";
import { AuthPostsType } from "../types";
import EditPost from "./EditPost";

const MyPosts = () => {
  const { data, isLoading } = useQuery<AuthPostsType>(
    ["authPosts"],
    getAuthPosts
  );

  if (isLoading) {
    return <SkeletonPostLoader />;
  }

  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          key={post.id}
          id={post.id}
          name={post.user?.name!}
          avatar={post.user?.image!}
          title={post.title}
          comments={post.comments!}
        />
      ))}
    </div>
  );
};

export default MyPosts;
