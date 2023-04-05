declare type Maybe<T> = T | undefined;
declare type ValueOf<T> = T[keyof T];

declare type ReactSVG = (
  props: React.SVGProps<SVGSVGElement> & { title?: string | undefined },
) => null | React.ReactElement;

interface IStringable {
  toString: () => string;
}
interface Window {
  optimizelyDatafile?: object;
}

declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  export const ReactComponent: (
    props: SVGProps<SVGElement> & { title?: string },
  ) => ReactElement;
  const content: string;
  export default content;
}

declare module "*.jpg";
declare module "*.png";
