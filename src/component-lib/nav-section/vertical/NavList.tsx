import { Collapse, List } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getActive } from "..";
import { NavListProps } from "../type";
import { NavItemRoot, NavItemSub } from "./NavItem";

// ----------------------------------------------------------------------

type NavListRootProps = {
  list: NavListProps;
  isCollapse: boolean;
};

export function NavListRoot({ list, isCollapse }: NavListRootProps) {
  const router = useRouter();
  const pathname = router.asPath;

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          item={list}
          isCollapse={isCollapse}
          active={active}
          open={open}
          onOpen={() => setOpen(!open)}
        />

        {!isCollapse && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(list.children || []).map((item) => (
                <NavListSub key={item.title} list={item} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  list: NavListProps;
};

function NavListSub({ list }: NavListSubProps) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  // https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.tsx
  useEffect(() => {
    if (router.isReady) {
      setActive(getActive(list.path, router.asPath));
    }
  }, [router.isReady, router.asPath, list.path]);

  if (hasChildren) {
    return (
      <>
        <NavItemSub
          item={list}
          onOpen={() => setOpen(!open)}
          open={open}
          active={active}
        />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <NavItemSub
                key={item.title}
                item={item}
                active={getActive(item.path, router.asPath)}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemSub item={list} active={active} />;
}
