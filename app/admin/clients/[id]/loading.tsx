export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-md bg-muted animate-pulse" />
        <div className="h-8 w-48 rounded-md bg-muted animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column skeleton */}
        <div className="lg:col-span-1 space-y-6">
          <div className="h-64 rounded-lg bg-muted animate-pulse" />
          <div className="h-48 rounded-lg bg-muted animate-pulse" />
          <div className="h-40 rounded-lg bg-muted animate-pulse" />
        </div>

        {/* Right column skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-12 w-full rounded-lg bg-muted animate-pulse" />
          <div className="h-64 rounded-lg bg-muted animate-pulse" />
          <div className="h-48 rounded-lg bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}
