import { Container, Grid } from "@mui/material";
import Page from "component-lib/Page";
import useApps from "hooks/useApps";
import useAuth from "hooks/useAuth";
import useSettings from "hooks/useSettings";
import { AppWelcome } from "../example-apps/components/app";

// ----------------------------------------------------------------------

function GeneralApp() {
  const { accountInfo, rolesAssigned } = useAuth();
  const { allApps } = useApps();
  const { themeStretch } = useSettings();

  return (
    <Page title="Core Services UI">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={1}>
          {rolesAssigned &&
            allApps &&
            allApps.length > 0 &&
            allApps
              .filter((app) => {
                return rolesAssigned.some(
                  (role) =>
                    app.resourceid && app.resourceid === role.resourceId,
                );
              })
              .map((app) => (
                <Grid key={app.app_name} item xs={12} md={3}>
                  <AppWelcome
                    displayName={app.app_name}
                    appName={app.app_name}
                    accessible={true}
                    url={app.app_url}
                    accountInfo={{
                      name: accountInfo.name,
                      emailid: accountInfo.username,
                    }}
                  />
                </Grid>
              ))}
        </Grid>
      </Container>
    </Page>
  );
}

/*getInitialProps getServerSideProps getStaticProps
GeneralApp.getInitialProps = async () => {
  const allApps = await fetch("/api/getAllApplications",
    {
      method: "POST",
      body: process.env.NEXT_PUBLIC_PG_SELECT,
      headers: { "Content-type": "application/json;" }
    })
    .then((res) => res.json());

  return { data: allApps };
};

export async function getStaticProps() {
  const res = await fetch('http://localhost:8080/api/getAllApplications', {
    method: "POST",
    body: process.env.NEXT_PUBLIC_PG_SELECT,
    headers: { "Content-type": "application/json;" }
  });
  const allApps = await res.json();
  return {
    props: {
      data: allApps,
    },
  }
}*/

export default GeneralApp;
