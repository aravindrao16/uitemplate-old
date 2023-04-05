import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import LoadingScreen from "component-lib/LoadingScreen";
import Navigate from "component-lib/Navigate";
import Paths from "paths";
import { ReactNode } from "react";

// ----------------------------------------------------------------------
// This guard should wrap any pages that requires the user to first be
// authenticated and logged in using their Azure SSO login.
//
// It will show a loading state while it checks for authentication then
// redirects the user to log in if they are not logged in.
//
// See the example-app routes for example usage.
// ----------------------------------------------------------------------

type AuthGuardProps = {
  children?: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (inProgress !== InteractionStatus.None) {
    return <LoadingScreen />;
  } else if (!isAuthenticated) {
    return <Navigate to={Paths.Login} />;
  }

  return <>{children}</>;
}
