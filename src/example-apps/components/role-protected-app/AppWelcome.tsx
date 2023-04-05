import {
  Button,
  Card,
  CardContent,
  CardProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SeoIllustration from "assets/illustration_seo";
import { exampleApiConfig } from "authConfig";
import { useAuthQuery } from "hooks/useAuthQuery";
import Link from "next/link";
import Paths from "paths";
import { fetchJson } from "util/fetchJson";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  displayName?: string;
}

export default function RoleProtectedAppWelcome({
  displayName,
}: AppWelcomeProps) {
  // This doesn't actually succeed, there is no running internal api template.
  // The point of this is to exercise the access token acquisition for the
  // useApi scopes.
  // immediate: true,
  const { isLoading, isFetching, isError, error } = useAuthQuery(
    ["myCacheKey"],
    () =>
      fetchJson({
        url: "api/v1/something",
      }),
    {
      scopes: exampleApiConfig.scopes,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  );

  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: "grey.800",
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome to the Role Protected App,
          <br /> {!displayName ? "..." : displayName}!
        </Typography>

        <Typography gutterBottom variant="body1">
          API Request Status:{" "}
          {isLoading ? "Loading" : isFetching ? "Fetching" : "Idle"}
        </Typography>
        <Typography gutterBottom variant="body1">
          {isError && `${error}`}
        </Typography>

        <Link href={Paths.ExampleApp}>
          <a>
            <Button variant="contained">Go to unprotected app</Button>
          </a>
        </Link>
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: "auto", md: "inherit" },
        }}
      />
    </RootStyle>
  );
}
