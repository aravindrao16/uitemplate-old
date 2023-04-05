import { BoxProps } from "@mui/material";
import LogoIcon from "assets/logo_icon";
import Link from "next/link";
import Paths from "paths";

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx }: Props) {
  if (disabledLink) {
    return <LogoIcon sx={sx} />;
  }

  return (
    <Link href={Paths.Home}>
      <a>
        <LogoIcon sx={sx} />
      </a>
    </Link>
  );
}
