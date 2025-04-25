import { Skeleton } from "@/components/ui/skeleton";

export default function DiscussionsSkeleton() {
  return (
    <>
      <div className="mt-8">
        <div className="flex items-start gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="w-full pb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-3 max-w-md mt-3" />
            <Skeleton className="h-3 max-w-md mt-2" />
            <div className="mt-3">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 ml-8 mt-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="w-full pb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-3 max-w-md mt-3" />
            <Skeleton className="h-3 max-w-md mt-2" />
            <div className="mt-3">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-start gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="w-full pb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-3 max-w-md mt-3" />
            <Skeleton className="h-3 max-w-md mt-2" />
            <div className="mt-3">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2 ml-8 mt-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="w-full pb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-3 max-w-md mt-3" />
            <Skeleton className="h-3 max-w-md mt-2" />
            <div className="mt-3">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
