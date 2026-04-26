import { use } from "react";
import { OnboardingContext } from ".";

export function useOnboardingContext() {
  const value = use(OnboardingContext);

  if (!value) {
    throw new Error(
      '"useOnboardingContext" must be used inside "OnboardingProvider"',
    );
  }

  return value;
}
