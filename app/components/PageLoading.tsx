import { Spinner } from "@/app/components/ui/spinner";

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-green-600">
      <Spinner size="lg" />
    </div>
  );
}
