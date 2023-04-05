import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrorIllustration from "assets/illustration_500";
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

export default function Error() {
  return (
    <Page title="Error" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                Oops, an error was encountered!
              </Typography>
            </m.div>
            <Typography sx={{ color: "text.secondary" }}>
              Sorry, something went wrong. You can try again or report a bug.
            </Typography>

            <m.div variants={varBounce().in}>
              <ErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
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
