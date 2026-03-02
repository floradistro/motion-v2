import { cn } from "@/lib/design-system";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/[0.04] border border-white/[0.04]",
        className,
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[#0a0a0a] border border-white/[0.04] overflow-hidden">
      <Skeleton className="aspect-[3/4]" />
      <div className="p-8 space-y-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[340px] sm:w-[380px] lg:w-[420px] p-8 lg:p-10 bg-white/[0.015] border border-white/[0.04]">
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-3.5 h-3.5 rounded-sm" />
        ))}
      </div>
      <Skeleton className="h-5 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-8" />
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Skeleton className="aspect-square" />
          <div className="space-y-6 py-12">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-12 w-32 mt-8" />
            <Skeleton className="h-14 w-full mt-8" />
          </div>
        </div>
      </div>
    </main>
  );
}
