import { Box, Link } from "@mui/material";
import Iconify from "component-lib/Iconify";
import NavLink from "component-lib/NavLink";
import { forwardRef, ReactElement } from "react";
import { ICON } from "theme/theme-config";
import { isExternalLink } from "..";
import { NavItemProps } from "../type";
import { ListItemStyle } from "./style";

// ----------------------------------------------------------------------

export const NavItemRoot = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  NavItemProps
>(({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <ListItemStyle
        ref={ref}
        open={open}
        activeRoot={active}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      <NavItemContent icon={icon} title={title} children={children} />
    </ListItemStyle>
  ) : (
    <NavLink href={path} passHref>
      <ListItemStyle activeRoot={active}>
        <NavItemContent icon={icon} title={title} children={children} />
      </ListItemStyle>
    </NavLink>
  );
});

// ----------------------------------------------------------------------

export const NavItemSub = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  NavItemProps
>(({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <ListItemStyle
        ref={ref}
        subItem
        disableRipple
        open={open}
        activeSub={active}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <NavItemContent icon={icon} title={title} children={children} subItem />
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle
      subItem
      href={path}
      disableRipple
      rel="noopener"
      target="_blank"
      component={Link}
    >
      <NavItemContent icon={icon} title={title} children={children} subItem />
    </ListItemStyle>
  ) : (
    <ListItemStyle
      disableRipple
      component={NavLink}
      href={path}
      activeSub={active}
      subItem
    >
      <NavItemContent icon={icon} title={title} children={children} subItem />
    </ListItemStyle>
  );
});

// ----------------------------------------------------------------------

type NavItemContentProps = {
  title: string;
  icon?: ReactElement;
  children?: { title: string; path: string }[];
  subItem?: boolean;
};

function NavItemContent({
  icon,
  title,
  children,
  subItem,
}: NavItemContentProps) {
  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
            "& svg": { width: "100%", height: "100%" },
          }}
        >
          {icon}
        </Box>
      )}
      {title}
      {children && (
        <Iconify
          icon={subItem ? "eva:chevron-right-fill" : "eva:chevron-down-fill"}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  );
}
