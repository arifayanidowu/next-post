"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast, Id } from "react-toastify";
import { addComment } from "../endpoints/addComment";
import Button from "./Button";

const AddComments = ({ id }: { id: string }) => {
  let toastId: Id;
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["postDetail", id]);
      toast.update(toastId, {
        render: "Comment added successfully",
        type: "success",
        isLoading: false,
        closeButton: true,
      });
      setComment("");
      setDisabled(false);
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);
    },
    onError: (error: unknown) => {
      const err = error as { message: string };
      toast.update(toastId, {
        render: err.message,
        type: "error",
        isLoading: false,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toastId = toast.loading("Adding comment...");
    setDisabled(true);
    mutate({ id, comment });
  };
  return (
    <form className="my-8" onSubmit={onSubmit}>
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border-2 text-lg border-slate-500 bg-transparent outline-none dark:border-white rounded-md px-2 py-1 my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="submit"
          disabled={disabled || isLoading || !comment.length}
          loading={isLoading}
        >
          Add Comment
        </Button>
        <p
          className={`
        font-bold ${
          comment.length > 300 ? "text-red-500" : "text-slate-500"
        } my-3
      `}
        >
          {comment.length}/300
        </p>
      </div>
    </form>
  );
};

export default AddComments;
