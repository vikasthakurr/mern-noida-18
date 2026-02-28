import React from "react";
const Skelton = () => {
  return (
    <div className="max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
      <div className="h-48 w-full animate-pulse bg-slate-200" />

      <div className="space-y-4 p-5">
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
        <div className="h-7 w-3/4 animate-pulse rounded-md bg-slate-200" />

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="h-10 w-28 animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div>
  );
};

export default Skelton;
