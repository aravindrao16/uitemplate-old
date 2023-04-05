import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { graphApiTokenSilentRequest } from "authConfig";
import MyAvatar from "component-lib/MyAvatar";
import AuthGuard from "guards/AuthGuard";
import useApps from "hooks/useApps";
import useAuth from "hooks/useAuth";
import useCollapseDrawer from "hooks/useCollapseDrawer";
import useInactiveTimeout from "hooks/useInactiveTimeout";
import useResponsive from "hooks/useResponsive";
import useSettings from "hooks/useSettings";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Login from "pages/Login";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { HEADER, NAVBAR } from "theme/theme-config";
import DashboardHeader from "./header";
import NavbarHorizontal from "./navbar/NavbarHorizontal";
import NavbarVertical from "./navbar/NavbarVertical";
import Paths from "paths";
// ----------------------------------------------------------------------

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})<MainStyleProps>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------
type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { collapseClick, isCollapse } = useCollapseDrawer();
  const { themeLayout } = useSettings();
  const isDesktop = useResponsive("up", "lg");
  const [open, setOpen] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const { instance } = useMsal();
  const { accountInfo, setRolesAssigned } = useAuth();
  const { setAllApps } = useApps();
  const isAuthenticated = useIsAuthenticated();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState("");

  const verticalLayout = themeLayout === "vertical";

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  //set inactive timer
  const onModelReset = () => {
    setIsIdle(false);
  };

  const onModelLogout = () => {
    return handleLogout();
  };

  const handleLogout = async () => {
    try {
      setIsIdle(false);
      await instance.logoutPopup();
      router.replace(Paths.Login);

    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const onInactiveTimeout = () => {
    setIsIdle(true);
    console.log("Idle timer end");
  };
  useInactiveTimeout(Number(process.env.NEXT_PUBLIC_IDLE_TIMEOUT || "1800000"), onInactiveTimeout, isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const loadAvatarAndRoles = async () => {
      const headersAvatar = new Headers();
      const headersRole = new Headers();

      const urlAvatar = `https://graph.microsoft.com/v1.0/me/photo/$value`;
      const urlRole = `https://graph.microsoft.com/v1.0/users/${accountInfo.localAccountId}/appRoleAssignments`;

      headersAvatar.append("Content-Type", "image/jpg");

      const fetchOptionsAvatar = {
        method: "GET",
        headers: headersAvatar,
      };
      const fetchOptionsRole = {
        method: "GET",
        headers: headersRole,
      };

      await instance
        .acquireTokenSilent({
          ...graphApiTokenSilentRequest,
          account: accountInfo,
        })
        .then((result) => result.accessToken)
        .then((token) => {
          headersAvatar.append("Authorization", `Bearer ${token}`);
          headersRole.append("Authorization", `Bearer ${token}`);
        })
        .then(() => fetch(urlAvatar, fetchOptionsAvatar))
        .then((response) => response.blob())
        .then((avatarBlob) => URL.createObjectURL(avatarBlob))
        .then((avatarUrl) => setAvatarUrl(avatarUrl))
        .then(() => fetch(urlRole, fetchOptionsRole))
        .then((response) => response.json())
        .then((roles) => setRolesAssigned(roles?.value));
    };

    const loadAllApps = async () => {
      await fetch("/api/getData", {
        method: "POST",
        body: process.env.NEXT_PUBLIC_PG_SELECT,
        headers: { "Content-type": "application/json;" },
      })
        .then((response) => response.json())
        .then((apps) => setAllApps(apps));
    };

    loadAvatarAndRoles();
    loadAllApps();
  }, [accountInfo, instance, isAuthenticated, setRolesAssigned, setAllApps]);

  if (!isAuthenticated) {
    return <Login />;
  }

  const avatar = <MyAvatar avatarUrl={avatarUrl} name={accountInfo.name} />;

  if (verticalLayout) {
    return (
      <AuthGuard>
        <DashboardHeader
          onOpenSidebar={handleOpen}
          verticalLayout={verticalLayout}
          avatar={avatar}
          isIdle={isIdle}
          onModelLogout={onModelLogout}
          onModelReset={onModelReset}
        />

        {isDesktop ? (
          <NavbarHorizontal />
        ) : (
          <NavbarVertical
            isOpenSidebar={open}
            onCloseSidebar={handleClose}
            avatar={avatar}
          />
        )}

        <Box
          component="main"
          sx={{
            px: { lg: 2 },
            pt: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
            },
            pb: {
              xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
              lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
            },
          }}
        >
          {children}
        </Box>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <Box
        sx={{
          display: { lg: "flex" },
          minHeight: { lg: 1 },
        }}
      >
        <DashboardHeader
          isCollapse={isCollapse}
          onOpenSidebar={handleOpen}
          avatar={avatar}
          isIdle={isIdle}
          onModelReset={onModelReset}
          onModelLogout={onModelLogout}
        />

        <NavbarVertical
          isOpenSidebar={open}
          onCloseSidebar={handleClose}
          avatar={avatar}
        />

        <MainStyle collapseClick={collapseClick}>{children}</MainStyle>
      </Box>
    </AuthGuard>
  );
}
