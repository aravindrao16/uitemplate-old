import {
  Chip,
  Container,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import HeaderBreadcrumbs from "component-lib/HeaderBreadcrumbs";
import Page from "component-lib/Page";
import useMsalRoles from "hooks/useMsalRoles";
import useSettings from "hooks/useSettings";
import Paths from "paths";

export default function UserProfile() {
  const { themeStretch } = useSettings();
  const roles = useMsalRoles();

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[{ name: "Home", href: Paths.Home }, { name: "Profile" }]}
        />
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            flexDirection: "column",
            alignContent: "center",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          <Typography
            variant="h6"
            sx={{
              textOverflow: "ellipsis",
            }}
          >
            Application Roles assigned to you
          </Typography>
          <Stack direction="row">
            {roles.map((data, i) => {
              let icon;

              return (
                <ListItem key={i}>
                  <Chip icon={icon} label={data} />
                </ListItem>
              );
            })}
          </Stack>
        </Paper>
      </Container>
    </Page>
  );
}
