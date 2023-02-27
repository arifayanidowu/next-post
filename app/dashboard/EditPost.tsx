"use client";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast, Id } from "react-toastify";
import Toggle from "./Toggle";
import { deletePost } from "../endpoints/deletePost";

interface IEditPost {
  id: string;
  name: string;
  title: string;
  avatar: string;
  comments?: any[];
}

const EditPost = ({ id, name, title, avatar, comments }: IEditPost) => {
  const queryClient = useQueryClient();
  const [toggle, setToggle] = useState(false);
  let toastId: Id;

  const { mutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["authPosts"]);
      setToggle(false);
      toast.update(toastId!, {
        render: "Post deleted successfully",
        type: "success",
        isLoading: false,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);
    },
    onError: (error) => {
      toast.update(toastId!, {
        render: (error as { message: string }).message,
        type: "error",
        isLoading: false,
        closeButton: true,
      });
      setToggle(false);
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);
    },
  });

  const onDeletePost = useCallback(() => {
    setToggle(false);
    toastId = toast.loading("Deleting post...");
    mutate(id);
  }, [id]);

  return (
    <>
      {toggle && <Toggle deletePost={onDeletePost} setToggle={setToggle} />}
      <div className="bg-white dark:bg-slate-700 p-8 my-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            src={avatar}
            width={32}
            height={32}
            alt={name}
            className="rounded-full"
          />
          <h3 className="font-bold">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-bold text-sm text-gray-700 dark:text-slate-400">
            {comments?.length} Comments
          </p>
          <button
            onClick={() => setToggle(true)}
            className="text-red-500 border border-red-400 py-1 px-3 rounded-md hover:bg-slate-100 transition-all duration-300 ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPost;
