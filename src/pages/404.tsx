import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PageNotFoundIllustration from "assets/illustration_404";
import { MotionContainer, varBounce } from "component-lib/animate";
import Page from "component-lib/Page";
import { m } from "framer-motion";
import Link from "next/link";
import Paths from "paths";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function NotFound() {
  return (
    <Page title="404 Page Not Found" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </m.div>
            <Typography sx={{ color: "text.secondary" }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>

            <m.div variants={varBounce().in}>
              <PageNotFoundIllustration
                sx={{ height: 260, my: { xs: 5, sm: 10 } }}
              />
            </m.div>

            <Link href={Paths.Home}>
              <a>
                <Button size="large" variant="contained">
                  Go to Home
                </Button>
              </a>
            </Link>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
