"use client";
import { useState } from "react";
import Button from "./Button";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <form className="bg-white dark:bg-slate-800 rounded-md my-8 p-8">
      <div className="flex flex-col my-4">
        <label htmlFor="title" className="block">
          Title
          <textarea
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-24 p-2 border bg-gray-50 dark:bg-slate-300 border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className={`flex items-center justify-between gap-2`}>
        <small
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >
          {title.length} / 300
        </small>
        <Button type="submit" disabled={isDisabled}>
          Create a post
        </Button>
      </div>
    </form>
  );
};

export default AddPost;
