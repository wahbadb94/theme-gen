import { serializeTheme } from "./serialize";
import { ExtendableTailwindProperties } from "./types";
import * as fs from "fs";
import { ThemeDefinition } from "./theme";

export function gen(
  theme: ThemeDefinition,
  cssPath: string,
  tailwindThemeExtensionPath: string
) {
  // generate the css file content
  const cssFileContent = genCss(theme);

  // generate the tailwind extension file content
  const tailwindThemeExtensionContent = genTailwindExtension(theme);

  // write the css file
  fs.writeFile(cssPath, cssFileContent, (err) => {
    if (err) {
      console.log(err);
    }
  });

  // write the tailwindExtension cjs file
  fs.writeFile(
    tailwindThemeExtensionPath,
    tailwindThemeExtensionContent,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

export function genCss(theme: ThemeDefinition): string {
  // generate a list of css variables from the theme object
  const cssGenConfigs = serializeTheme(theme);

  return `
  /* NOTE: This file was auto-generated. DO NOT MODIFY. */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    :root {
      ${cssGenConfigs
        .map((v) => `${v.cssVar}: ${v.hexValue};`)
        .join("\n      ")}
    }
  }
`;
}

export function genTailwindExtension(theme: ThemeDefinition): string {
  // generate a list of css variables from the theme object
  const cssGenConfigs = serializeTheme(theme);

  // generate the taiilwind extension file
  return `
    /* NOTE: This file was auto-generated. DO NOT MODIFY. */
    module.exports = {
      extend: { ${ExtendableTailwindProperties.reduce((acc, prop) => {
        const str = `
            ${prop}: {
              skin: {
                ${cssGenConfigs
                  .filter((c) => c.twType === prop)
                  .map((c) => `"${c.twName}": "var(${c.cssVar})",`)
                  .join("\n\t\t\t\t\t\t\t")}
              },
            },`;

        return acc + str;
      }, "")}
        },
      }
    `;
}
