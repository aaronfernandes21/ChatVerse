const ChatVerseSkeleton = () => {
  const letters = "ChatVerse".split("");

  return (
    <aside
      className="h-full w-full flex flex-col items-center justify-center text-center p-6 space-y-6"
    >
      {/* Animated Letter Blocks */}
      <div className="flex gap-2 lg:gap-4 animate-pulse flex-wrap justify-center">
        {letters.map((letter, idx) => (
          <div
            key={idx}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-base-300 flex items-center justify-center text-lg font-bold text-base-content shadow-sm"
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Tagline Skeleton */}
      <div className="space-y-2">
        <div className="skeleton h-4 w-48 mx-auto rounded" />
        <div className="skeleton h-4 w-32 mx-auto rounded" />
      </div>
    </aside>
  );
};

export default ChatVerseSkeleton;
