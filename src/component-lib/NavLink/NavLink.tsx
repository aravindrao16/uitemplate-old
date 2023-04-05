import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";

export type NavLinkProps = Parameters<typeof Link>[number];

const NavLink = forwardRef(
  (
    { className: customClassName = "", children, ...props }: NavLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const router = useRouter();
    const [className, setClassName] = useState(customClassName);

    // https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.tsx
    useEffect(() => {
      if (router.isReady) {
        const to = props.as || props.href;
        const path = typeof to === "string" ? to : to.pathname ?? "";
        const linkPathname = new URL(path, location.href).pathname;
        const activePathname = new URL(router.asPath, location.href).pathname;
        const newClassName =
          linkPathname === activePathname
            ? clsx("active", className)
            : className;
        if (newClassName !== className) {
          setClassName(newClassName);
        }
      }
    }, [className, props.as, props.href, router.asPath, router.isReady]);

    return (
      <Link
        ref={ref}
        passHref
        className={className}
        aria-current={className.includes("active") && "page"}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

export default NavLink;
