export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white h-20 border-b border-gray-100 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-xl" />
          <div className="hidden sm:block">
            <div className="w-28 h-4 bg-gray-200 rounded mb-1" />
            <div className="w-20 h-2.5 bg-gray-100 rounded" />
          </div>
        </div>
        <div className="ml-auto hidden md:flex items-center gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-14 h-3.5 bg-gray-100 rounded" />
          ))}
          <div className="w-24 h-9 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="relative bg-gradient-to-br from-[#0A1F44] to-[#091a3a] min-h-screen flex items-center pt-20">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-24 sm:py-36 lg:py-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="w-full">
              <div className="w-44 h-7 bg-white/10 rounded-full mb-5" />
              <div className="w-full h-12 bg-white/10 rounded-lg mb-3" />
              <div className="w-3/4 h-12 bg-white/10 rounded-lg mb-5" />
              <div className="w-full h-4 bg-white/10 rounded mb-2" />
              <div className="w-5/6 h-4 bg-white/10 rounded mb-8" />
              <div className="flex gap-3">
                <div className="w-36 h-12 bg-white/20 rounded-xl" />
                <div className="w-32 h-12 bg-white/10 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content sections skeleton */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-14 gap-3">
            <div className="w-28 h-7 bg-gray-200 rounded-full" />
            <div className="w-72 h-9 bg-gray-200 rounded-lg" />
            <div className="w-96 h-4 bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-3xl overflow-hidden shadow-md">
                <div className="h-44 bg-gray-200" />
                <div className="bg-white p-6">
                  <div className="w-32 h-5 bg-gray-200 rounded mb-3" />
                  <div className="w-full h-3 bg-gray-100 rounded mb-1.5" />
                  <div className="w-5/6 h-3 bg-gray-100 rounded mb-5" />
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
