import SvgIconStyle from "component-lib/SvgIconStyle";
import Paths from "paths";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  dashboard: getIcon("ic_dashboard"),
  auth: getIcon("ic_authenticator"),
};

const navConfig = [
  {
    subheader: "general",
    items: [
      { title: "Dashboard", path: Paths.ExampleApp, icon: ICONS.dashboard },
      {
        title: "Admin",
        path: Paths.ExampleRoleProtectedApp,
        icon: ICONS.auth,
      },
    ],
  },
];

export default navConfig;
