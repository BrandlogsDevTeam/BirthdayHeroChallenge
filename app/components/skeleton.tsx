import { Skeleton } from "@/components/ui/skeleton";

export function NomineeCardSkeleton() {
  return (
    <div className="p-6">
      <div className="flex gap-4">
        <div className="flex-grow min-w-0 flex gap-4 items-start justify-between">
          <div className="flex gap-4 min-w-0 flex-grow">
            <div className="flex-shrink-0">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <Skeleton className="w-full h-full rounded-full" />
              </div>
            </div>

            <div className="min-w-0 flex-grow">
              <div className="space-y-1 mb-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
