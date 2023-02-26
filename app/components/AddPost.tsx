"use client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast, Id } from "react-toastify";
import { addPost } from "../endpoints";
import Button from "./Button";

const AddPost = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let toastId: Id;

  const { mutateAsync, isLoading } = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setIsDisabled(false);
      setTitle("");
      toast.update(toastId, {
        render: "Post created! 🎉",
        type: "success",
        isLoading: false,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);
    },
    onError: (error: any) => {
      const err = error;
      toast.update(toastId, {
        render: err.message,
        type: "error",
        isLoading: false,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);

      setIsDisabled(false);
    },
  });

  return (
    <>
      <form
        className="bg-white dark:bg-slate-800 rounded-md my-8 p-8"
        onSubmit={(e) => {
          e.preventDefault();
          toastId = toast.loading("Creating post...");
          setIsDisabled(true);
          mutateAsync({ title });
        }}
      >
        <div className="flex flex-col my-4">
          <label htmlFor="title" className="block">
            Title
            <textarea
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-24 p-2 dark:text-gray-600 border bg-gray-50 dark:bg-slate-300 border-gray-300 rounded-md"
            />
          </label>
        </div>
        <div className={`flex items-center justify-between gap-2`}>
          <small
            className={`font-bold text-sm dark:text-gray-400 ${
              title.length > 300 ? "text-red-700" : "text-gray-700"
            }`}
          >
            {title.length} / 300
          </small>
          <Button type="submit" disabled={isDisabled} loading={isLoading}>
            Create a post
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddPost;
