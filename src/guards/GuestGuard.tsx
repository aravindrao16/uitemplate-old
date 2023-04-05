import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import LoadingScreen from "component-lib/LoadingScreen";
import Navigate from "component-lib/Navigate";
import Paths from "paths";
import { ReactNode } from "react";

// ----------------------------------------------------------------------
// This guard should wrap any pages requiring the user to be unauthenticated
// (logged out). If the user happens to already be logged in, it will redirect
// the user to the dashboard which is wrapped in an `AuthGuard`.
//
// This is primarily used to ensure only logged out users will ever see the
// `Login` page.
//
// See the example-app routes for example usage.
// ----------------------------------------------------------------------

type GuestGuardProps = {
  children?: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  if (inProgress !== InteractionStatus.None) {
    return <LoadingScreen />;
  } else if (isAuthenticated) {
    return <Navigate to={Paths.Home} />;
  }

  return <>{children}</>;
}
