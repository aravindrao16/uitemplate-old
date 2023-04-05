import { AppsContext } from "providers/AppsProvider";
import { useContext } from "react";

// ----------------------------------------------------------------------

const useApps = () => useContext(AppsContext);

export default useApps;
