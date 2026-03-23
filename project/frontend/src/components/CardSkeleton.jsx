function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden flex flex-col animate-pulse">
      <div className="h-44 bg-gray-100" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-2 w-16 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
        <div className="h-5 w-12 bg-gray-200 rounded mt-1" />
        <div className="flex justify-between mt-1">
          <div className="h-4 w-14 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-7 w-full bg-gray-200 rounded mt-1" />
      </div>
    </div>
  );
}

export default CardSkeleton;
