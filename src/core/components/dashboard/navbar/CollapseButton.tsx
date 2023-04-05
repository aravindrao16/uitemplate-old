import { Box } from "@mui/material";
import { ReactComponent as CollapseButtonIcon } from "assets/collapse_button_icon.svg";
import { IconButtonAnimate } from "component-lib/animate";

// ----------------------------------------------------------------------

type Props = {
  onToggleCollapse: VoidFunction;
  collapseClick: boolean;
};

export default function CollapseButton({
  onToggleCollapse,
  collapseClick,
}: Props) {
  return (
    <IconButtonAnimate onClick={onToggleCollapse}>
      <Box
        sx={{
          lineHeight: 0,
          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(collapseClick && {
            transform: "rotate(180deg)",
          }),
        }}
      >
        <CollapseButtonIcon />
      </Box>
    </IconButtonAnimate>
  );
}
