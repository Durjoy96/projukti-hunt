import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function CardSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="w-full h-32" />
      <Skeleton className="w-full h-32" />
    </div>
  );
}
