import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-5 mt-12">
        {/* breadcrumbs */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="mt-8 relative">
          <div className="w-full h-72 bg-base-200 rounded-lg"></div>
          {/* product details */}
          <div className="absolute bottom-0 bg-base-100/50 backdrop-blur-md w-full p-5 rounded-tr-lg rounded-tl-lg">
            <div className="md:flex md:justify-between md:items-center">
              <div className="flex items-start gap-6">
                <Skeleton className="h-14 w-14 rounded-lg" />
                <div>
                  <Skeleton className="h-6 w-14 md:w-20" />
                  <Skeleton className="h-4 w-32 md:w-52 mt-2" />
                </div>
              </div>
              {/* buttons */}
              <div className="flex items-center gap-4 mt-8 md:mt-0">
                <Skeleton className="h-10 w-20 rounded-lg" />
                <Skeleton className="h-10 w-20 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 max-w-md mt-2" />
        </div>
        {/* pricing */}
        <Skeleton className="h-4 w-12 mt-8" />
        <div className="flex justify-start md:justify-between md:items-center mt-2">
          {/* categories */}
          <div className="md:flex items-center gap-2 hidden">
            <Skeleton className="h-4 w-20" />
            <p className="items-center gap-2">
              <span className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />{" "}
                <Skeleton className="h-4 w-20" />
              </span>
            </p>
          </div>
          {/* product social accounts */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>
        <div className="p-6 bg-base-200 rounded-lg mt-8 flex md:justify-between md:items-center flex-col md:flex-row gap-4 md:gap-0">
          <span className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />{" "}
            <Skeleton className="h-4 w-20" />
          </span>
          {/* hunter details */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="grid gap-2">
              <Skeleton className="h-4 w-20" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
        {/* carousel */}
        <div className="mt-12 flex gap-6">
          <Skeleton className="h-72 w-full rounded-lg" />
          <Skeleton className="h-72 w-full rounded-lg hidden md:inline-block" />
        </div>
      </section>
    </>
  );
}
