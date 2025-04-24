import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function CardSkeleton() {
  return (
    <div className="grid gap-4">
      <div className="bg-base-200/80 p-6 rounded-lg">
        <div className="flex gap-4 items-start">
          <Skeleton className="h-12 w-14 rounded-lg" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-6 w-14 md:w-20" />
            <Skeleton className="h-4 w-32 md:w-52" />
            <Skeleton className="h-4 w-18 md:w-32" />
          </div>
          <Skeleton className="h-14 w-16 rounded-lg items-end" />
        </div>
      </div>
      <div className="bg-base-200/80 p-6 rounded-lg">
        <div className="flex gap-4 items-start">
          <Skeleton className="h-12 w-14 rounded-lg" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-6 w-14 md:w-20" />
            <Skeleton className="h-4 w-32 md:w-52" />
            <Skeleton className="h-4 w-18 md:w-32" />
          </div>
          <Skeleton className="h-14 w-16 rounded-lg items-end" />
        </div>
      </div>
    </div>
  );
}
