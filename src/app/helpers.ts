import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryErrorWithStringError(
  error: unknown
): error is FetchBaseQueryError & { data: { message: string } } {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    "data" in error &&
    typeof (error as any).data?.message === "string"
  );
}
