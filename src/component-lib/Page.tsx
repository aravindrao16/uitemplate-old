import { Box, BoxProps } from "@mui/material";
import Head from "next/head";
import { forwardRef, ReactNode } from "react";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children?: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = "", meta, ...other }, ref) => (
    <>
      <Head>
        <title>{`${title} | Dashboard`}</title>
        {meta}
      </Head>
      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  ),
);

export default Page;
