import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Url } from "url";

type NavigateProps = {
  to: string | Url;
  replace?: boolean;
};

export default function Navigate({ to, replace = false }: NavigateProps) {
  const router = useRouter();
  // Prevents infinite loop if somehow the navigation didn't take place.
  const [navigated, setNavigated] = useState(false);

  useEffect(() => {
    if (navigated) {
      return;
    }
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
    setNavigated(true);
  }, [navigated, replace, router, to]);

  return null;
}
