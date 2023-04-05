import { CollapseDrawerContext } from "providers/CollapseDrawerProvider";
import { useContext } from "react";

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
