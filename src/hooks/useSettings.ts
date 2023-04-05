import { SettingsContext } from "providers/SettingsProvider";
import { useContext } from "react";

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;
