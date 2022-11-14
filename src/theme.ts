import { ThemeableProperty, Themed } from "./types";

/** */
export type ThemeDefinition = {
  /** */
  app: Themed<"fill" | "text">;
  /** */
  nav: Themed<"fill" | "text">;
  /** */
  content: Themed<"fill" | "text">;
  /** */
  button: Themed<"fill" | "text", "hover", "primary">;
};
