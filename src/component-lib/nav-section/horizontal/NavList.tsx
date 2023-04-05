import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { getActive } from "..";
import { NavListProps } from "../type";
import { NavItemRoot, NavItemSub } from "./NavItem";
import { PaperStyle } from "./style";

// ----------------------------------------------------------------------

type NavListRootProps = {
  list: NavListProps;
};

export function NavListRoot({ list }: NavListRootProps) {
  const menuRef = useRef(null);
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const hasChildren = list.children;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.tsx
  useEffect(() => {
    if (router.isReady) {
      setActive(getActive(list.path, router.asPath));
    }
  }, [router.isReady, router.asPath, list.path]);

  useEffect(() => {
    handleClose();
  }, [router.asPath]);

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          open={open}
          item={list}
          active={active}
          ref={menuRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(list.children || []).map((item) => (
            <NavListSub key={item.title} list={item} />
          ))}
        </PaperStyle>
      </>
    );
  }

  return <NavItemRoot item={list} active={active} />;
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  list: NavListProps;
};

function NavListSub({ list }: NavListSubProps) {
  const menuRef = useRef(null);
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          ref={menuRef}
          open={open}
          item={list}
          active={active}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(list.children || []).map((item) => (
            <NavListSub key={item.title} list={item} />
          ))}
        </PaperStyle>
      </>
    );
  }

  return <NavItemSub item={list} active={active} />;
}
