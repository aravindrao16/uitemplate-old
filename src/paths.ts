export enum BasePaths {
  Home = "/",
  NotFound = "/404",
  Error = "/error",
  Login = "/login",
  Profile = "/profile",
}

// Domain specific paths can be added to the AppPaths, or additional enums can be
// created for each domain - creating a hierarchy of routes, with sub-routes.

export enum AppPaths {
  ExampleApp = "/example-app",
  ExampleRoleProtectedApp = "/example-role-protected-app",
  Dashboard = "/dashboard",
  BulkVinAppraisal = "https://app-cvpbulkvin-dev.azurewebsites.net/",
}

export enum AppNames {
  BulkVinAppraisal = "Bulk Vin Appraisal Tool",
}
export const DocumentationUrl =
  "https://dev.azure.com/Lithia-Digital/Roam/_wiki/wikis/Roam.wiki/467/DevOps";

const Paths = {
  ...BasePaths,
  ...AppPaths,
};

export default Paths;
