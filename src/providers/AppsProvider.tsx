import useLocalStorage from "hooks/useLocalStorage";
import { createContext, ReactNode, useCallback } from "react";
// ----------------------------------------------------------------------

type AppInfo = {
  id: number;
  app_name: string;
  app_url: string;
  resourceid: string;
};

type AppsState = {
  allApps: Array<AppInfo>;
  setAllApps: (allApps: Array<AppInfo>) => void;
};

type AppsProviderProps = {
  children: ReactNode;
};

const stub = (): never => {
  throw new Error("You forgot to wrap your component in <AppsProvider>.");
};

const initialState: AppsState = {
  allApps: [],
  setAllApps: stub,
};

const AppsContext = createContext(initialState);

const AppsProvider = ({ children }: AppsProviderProps) => {
  const [allApps, setApps] = useLocalStorage("allApps", []);

  const setAllApps = useCallback(
    (allApps: Array<AppInfo>) => {
      setApps(allApps);
    },
    [setApps],
  );

  return (
    <AppsContext.Provider
      value={{
        allApps,
        setAllApps,
      }}
    >
      {children}
    </AppsContext.Provider>
  );
};

export default AppsProvider;
export { AppsContext };
export type { AppsState };
