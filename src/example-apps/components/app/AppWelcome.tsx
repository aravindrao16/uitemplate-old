import {
  Button,
  Card,
  CardContent,
  CardProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SeoIllustration from "assets/illustration_seo";
import Link from "next/link";
import Paths from "paths";
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
  appName?: string;
  accessible?: boolean;
  url?: string | URL;
  accountInfo?: object;
}

export default function AppWelcome({
  displayName,
  appName,
  accessible,
  url,
  accountInfo
}: AppWelcomeProps) {

  const handleButtonClick = (url: string | URL | undefined, accountInfo: object | undefined) => {
    window.open(url, JSON.stringify(accountInfo), "noreferrer");
    //window.open(url + `?data=${JSON.stringify(accountInfo)}`, JSON.stringify(accountInfo), "noreferrer");
    //window.open(url + `?data=${encodeURIComponent(JSON.stringify(accountInfo))}`, "_blank", "noreferrer");
  };

  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { sd: 1 },
          pl: { sd: 1 },
          color: "grey.800",
        }}
      >
        <Typography gutterBottom variant="h6">
          {displayName}
        </Typography>
        {/* <Typography gutterBottom variant="h8" color={!accessible && "red"}>
        {accessible ? "You are allowed to access this application" : "You don't have permission to access this application"}
        </Typography> */}
        <br />
        <Button
          size="small"
          variant="contained"
          onClick={() => handleButtonClick(url, accountInfo)}
          component={"a"}
          disabled={!accessible}
        >
          Click to open
        </Button>
      </CardContent>
    </RootStyle>
  );
}
