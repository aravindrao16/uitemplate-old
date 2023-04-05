import { Box, Link, Typography } from "@mui/material";
import isString from "lodash/isString";
import NextLink from "next/link";
import { ReactNode } from "react";
import Breadcrumbs, { Props as BreadcrumbsProps } from "./Breadcrumbs";

// ----------------------------------------------------------------------

interface Props extends BreadcrumbsProps {
  action?: ReactNode;
  heading: string;
  moreLink?: string | string[];
}

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = "" || [],
  sx,
  ...other
}: Props) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <Breadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <NextLink href={moreLink} passHref>
            <Link target="_blank" rel="noopener" variant="body2">
              {moreLink}
            </Link>
          </NextLink>
        ) : (
          moreLink.map((href) => (
            <NextLink href={href} key={href} passHref>
              <Link
                noWrap
                variant="body2"
                target="_blank"
                rel="noopener"
                sx={{ display: "table" }}
              >
                {href}
              </Link>
            </NextLink>
          ))
        )}
      </Box>
    </Box>
  );
}
