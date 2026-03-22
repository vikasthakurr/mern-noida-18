// animated skeleton placeholder matching Card layout
function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="flex justify-between mt-2">
          <div className="h-5 w-14 bg-gray-200 rounded" />
          <div className="h-4 w-10 bg-gray-200 rounded" />
        </div>
        <div className="h-9 w-full bg-gray-200 rounded-lg mt-1" />
      </div>
    </div>
  );
}

export default CardSkeleton;
