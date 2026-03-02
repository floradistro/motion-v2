import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <main className="min-h-screen bg-background pt-32 lg:pt-40 pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-20 lg:mb-28">
        <div className="text-center space-y-4">
          <div className="h-4 w-16 bg-white/[0.04] mx-auto animate-pulse" />
          <div className="h-12 w-96 max-w-full bg-white/[0.04] mx-auto animate-pulse" />
          <div className="h-5 w-80 max-w-full bg-white/[0.04] mx-auto animate-pulse" />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
