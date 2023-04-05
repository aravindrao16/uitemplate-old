// ----------------------------------------------------------------------

export { default as NavSectionVertical } from "./vertical";
export { default as NavSectionHorizontal } from "./horizontal";

export function isExternalLink(path: string) {
  return path.includes("http");
}

export function getActive(path: string, pathname: string) {
  const linkPathname = new URL(path, location.href).pathname;
  const activePathname = new URL(pathname, location.href).pathname;
  return path ? !!(linkPathname === activePathname) : false;
}
