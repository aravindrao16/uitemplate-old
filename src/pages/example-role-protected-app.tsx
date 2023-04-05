import { Container, Grid } from "@mui/material";
import Page from "component-lib/Page";
import useAuth from "hooks/useAuth";
import useSettings from "hooks/useSettings";
import { AppWelcome } from "../example-apps/components/role-protected-app";

// ----------------------------------------------------------------------

export default function RoleProtectedApp() {
  const { accountInfo } = useAuth();
  const { themeStretch } = useSettings();

  return (
    <Page title="Admin">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={accountInfo.name} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
