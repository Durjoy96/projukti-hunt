import { Skeleton } from "@/components/ui/skeleton";

export default function HunterDetailsSkeleton() {
  return (
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
  );
}
