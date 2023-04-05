import {
  Box,
  Breadcrumbs as MUIBreadcrumbs,
  BreadcrumbsProps,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { ReactElement } from "react";

// ----------------------------------------------------------------------

type TLink = {
  href?: string;
  name: string;
  icon?: ReactElement;
};

export interface Props extends BreadcrumbsProps {
  links: TLink[];
  activeLast?: boolean;
}

export default function Breadcrumbs({
  links,
  activeLast = false,
  ...other
}: Props) {
  const currentLink = links[links.length - 1].name;

  const listDefault = links.map((link) => (
    <LinkItem key={link.name} link={link} />
  ));

  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "text.disabled",
            textOverflow: "ellipsis",
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <MUIBreadcrumbs
      separator={
        <Box
          component="span"
          sx={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            bgcolor: "text.disabled",
          }}
        />
      }
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </MUIBreadcrumbs>
  );
}

// ----------------------------------------------------------------------

type LinkItemProps = {
  link: TLink;
};

function LinkItem({ link }: LinkItemProps) {
  const { href, name, icon } = link;
  return (
    <NextLink href={href || "#"} passHref>
      <Link
        key={name}
        variant="body2"
        component={NextLink}
        sx={{
          lineHeight: 2,
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          "& > div": { display: "inherit" },
        }}
      >
        <div>
          {icon && (
            <Box sx={{ mr: 1, "& svg": { width: 20, height: 20 } }}>{icon}</Box>
          )}
          {name}
        </div>
      </Link>
    </NextLink>
  );
}
