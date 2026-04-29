import { use } from "react";
import { CompleteProfileContext } from ".";

export function useCompleteProfileContext() {
  const value = use(CompleteProfileContext);

  if (!value) {
    throw new Error(
      '"useCompleteProfileContext" must be used inside "CompleteProfileProvider"',
    );
  }

  return value;
}
