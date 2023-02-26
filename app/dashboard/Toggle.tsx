"use client";

import { useRef } from "react";

interface IToggle {
  deletePost: () => void;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toggle = ({ deletePost, setToggle }: IToggle) => {
  const containerRef = useRef(null);

  const onClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === containerRef.current) {
      setToggle(false);
    }
  };

  return (
    <div
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
      ref={containerRef}
      onClick={onClose}
    >
      <div
        id="popup"
        className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:bg-slate-800 rounded-lg p-12 flex flex-col gap-6 items-center"
      >
        <h2 className="text-xl">Are you sure you want to delete this post?</h2>
        <h3 className="text-red-600 text-sm">
          Pressing this button will permanently delete this post.
        </h3>
        <button
          onClick={deletePost}
          className="text-white bg-red-600 py-2 px-1 rounded-md hover:bg-red-500 transition-all duration-300 ease-in-out w-32"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default Toggle;
