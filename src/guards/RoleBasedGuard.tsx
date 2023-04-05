import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Alert, AlertTitle, Container } from "@mui/material";
import LoadingScreen from "component-lib/LoadingScreen";
import Navigate from "component-lib/Navigate";
import useMsalRoles from "hooks/useMsalRoles";
import Paths from "paths";
import { ReactNode, useEffect, useState } from "react";

// ----------------------------------------------------------------------
// This guard should wrap any pages that requires the user to first be
// authenticated and logged in using their Azure SSO login AND to have the
// correct AAD role membership based on the RBAC set up for that page.
//
// It will show a loading state while it checks for authentication and roles,
// then redirects the user to log in if they are not logged in or are not
// members of the requested roles.
//
// You can optionally pass in custom JSX elements to `noRolesElement` to render
// to the user in the event they do not belong to the correct AAD roles.
//
// See the example-app routes for example usage.
// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  accessibleRoles: string[];
  children: ReactNode;
  noRolesElement?: ReactNode;
};

export default function RoleBasedGuard({
  accessibleRoles,
  children,
  noRolesElement,
}: RoleBasedGuardProp) {
  const roles = useMsalRoles();
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [hasRoles, setHasRoles] = useState(false);

  useEffect(() => {
    if (roles.length > 0) {
      setHasRoles(roles.some((v) => accessibleRoles.includes(v)));
    }
  }, [roles, accessibleRoles]);

  if (inProgress !== InteractionStatus.None) {
    return <LoadingScreen />;
  } else if (!isAuthenticated) {
    return <Navigate to={Paths.Login} />;
  } else if (!hasRoles) {
    if (noRolesElement) {
      return <>{noRolesElement}</>;
    } else {
      return (
        <Container>
          <Alert severity="error">
            <AlertTitle>Permission Denied</AlertTitle>
            You do not have permission to access this page. You must have one of
            the following roles: <b>{accessibleRoles}</b>.
          </Alert>
        </Container>
      );
    }
  }

  return <>{children}</>;
}
