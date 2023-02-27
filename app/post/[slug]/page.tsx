"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import GetAllPosts from "@/app/components/GetAllPosts";
import SkeletonPostLoader from "@/app/components/SkeletonPostLoader";
import { getPost } from "@/app/endpoints/getPost";
import { PostType } from "@/app/types";
import AddComments from "@/app/components/AddComments";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

export default function PostDetail(url: URL) {
  const router = useRouter();
  const { data, isLoading } = useQuery<PostType>(
    ["postDetail", url.params.slug],
    () => getPost(url.params.slug as string),
    {
      enabled: !!url.params.slug,
    }
  );

  if (isLoading) {
    return <SkeletonPostLoader />;
  }

  return (
    <div>
      <button
        onClick={() => {
          router.back();
        }}
        className="mb-3 border-2 border-slate-500 dark:border-white rounded-md px-4 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out"
      >
        Go Back
      </button>
      <GetAllPosts
        id={data!.id}
        name={data!.user?.name!}
        avatar={data!.user?.image!}
        title={data!.title}
        comments={data!.comments!}
      />
      <AddComments id={data!.id} />
      {data?.comments?.length ? (
        <>
          <h4 className="my-2">Comments</h4>
          {data?.comments?.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-slate-800 rounded-md my-6 p-8"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={comment.user?.image!}
                  width={28}
                  height={28}
                  className="rounded-full"
                  alt={comment.user?.name!}
                />
                <h3 className="text-md font-light">{comment.user?.name!}</h3>
                <small className="font-light text-xs text-gray-400 dark:text-slate-300 my-3">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </small>
              </div>
              <div>
                <h3 className="text-md">{comment.message}</h3>
              </div>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}
