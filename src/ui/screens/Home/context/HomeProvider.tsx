import { HomeContext, HomeContextValue } from ".";

type HomeProviderProps = HomeContextValue & {
  children: React.ReactNode;
};

export function HomeProvider({ children, ...ctxValue }: HomeProviderProps) {
  return (
    <HomeContext.Provider value={ctxValue}>{children}</HomeContext.Provider>
  );
}
