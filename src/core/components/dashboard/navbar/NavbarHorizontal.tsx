import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavSectionHorizontal } from "component-lib/nav-section";
import Config from "config";
import { memo } from "react";
import { HEADER } from "theme/theme-config";
import navConfig from "./NavConfig";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  transition: theme.transitions.create("top", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  width: "100%",
  position: "fixed",
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(1, 0),
  boxShadow: theme.customShadows.z8,
  top: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
  backgroundColor: theme.palette.background.default,
}));

const VersionStyle = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2.5),
  right: theme.spacing(5),
}));

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  return (
    <RootStyle>
      <Container maxWidth={false}>
        <NavSectionHorizontal navConfig={navConfig} />
        {Config.version && (
          <VersionStyle>
            <Typography variant="caption">{`v${Config.version}`}</Typography>
          </VersionStyle>
        )}
      </Container>
    </RootStyle>
  );
}

export default memo(NavbarHorizontal);
