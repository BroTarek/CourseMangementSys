export default function Loading() {
    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex justify-between items-center">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="rounded-md border p-4 space-y-4">
                <div className="h-10 bg-gray-100 rounded animate-pulse" />
                <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-16 bg-gray-50 rounded animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}
