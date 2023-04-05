import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IconButtonAnimate } from "component-lib/animate";
import Iconify from "component-lib/Iconify";
import Logo from "component-lib/Logo";
import useOffSetTop from "hooks/useOffSetTop";
import useResponsive from "hooks/useResponsive";
import { HEADER, NAVBAR } from "theme/theme-config";
import cssStyles from "util/cssStyles";
import AccountPopover from "./AccountPopover";
import ConfirmDialog from "component-lib/ConfirmDialog";
// ----------------------------------------------------------------------

type RootStyleProps = {
  isCollapse: boolean;
  isOffset: boolean;
  verticalLayout: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: "100%",
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
  isCollapse?: boolean;
  verticalLayout?: boolean;
  avatar: React.ReactNode;
  isIdle: boolean;
  onModelReset: VoidFunction;
  onModelLogout: VoidFunction;
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
  avatar,
  isIdle = false,
  onModelReset,
  onModelLogout
}: Props) {
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive("up", "lg");

  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Box sx={{ flexGrow: 1 }} />
        <ConfirmDialog
          open={isIdle}
          message="Session Idle timeout expired. Please reset session timer or logout."
          title="Core Service UI Dashboard"
          onNo={onModelLogout}
          onClose={() => { }}
          onYes={onModelReset}
          isYesButton={true}
          isNoButton={true}
          yesButtonText="Reset"
          noButtonText="Logout" />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <AccountPopover avatar={avatar} />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
