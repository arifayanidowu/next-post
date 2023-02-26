"use client";

const SkeletonPostLoader = () => {
  return (
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
  );
};

export default SkeletonPostLoader;
