import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      dark: string;
      light: string;
      red: string;
    };
    shadows: {
      dark: {
        bsDark: string;
        bsDarkInset: string;
        bsDarkHover: string;
        bsDarkActive: string;
      };
      light: {
        bsLight: string;
        bsLightInset: string;
        bsLightHover: string;
        bsLightActive: string;
      };
      red: {
        redBs: string;
        redBsHover: string;
        redBsActive: string;
      };
    };
  }
}

const dark = "#232323";
const light = "#f0f0f0";
const red = "#b43919";

const bsDark = "-5px -5px 10px #292828, 5px 5px 10px #171717";
const bsDarkInset = "inset -5px -5px 10px #292828, inset 5px 5px 10px #171717";
const bsDarkHover = "-2.5px -2.5px 5px #292828, 2.5px 2.5px 5px #171717";
const bsDarkActive = "inset -5px -5px 10px #292828, inset 5px 5px 10px #171717";

const bsLight = "-4px -4px 16px #ffffff, 4px 4px 16px #bcbcbc";
const bsLightInset =
  "inset -2.5px -2.5px 10px #ffffff, inset 2.5px 2.5px 10px #bcbcbc";
const bsLightHover = "-2px -2px 8px #ffffff, 2px 2px 8px #bcbcbc";
const bsLightActive = "inset -4px -4px 8px #ffffff, inset 4px 4px 8px #bcbcbc";

const redBs = " -5px -5px 10px #d85432, 5px 5px 10px #82240b";
const redBsHover = "-2.5px -2.5px 5px #d85432, 2.5px 2.5px 5px #82240b";
const redBsActive = "inset -5px -5px 10px #d85432, 5px 5px 10px #82240b";

const theme = {
  colors: {
    dark,
    light,
    red,
  },
  shadows: {
    dark: {
      bsDark,
      bsDarkInset,
      bsDarkHover,
      bsDarkActive,
    },
    light: {
      bsLight,
      bsLightInset,
      bsLightHover,
      bsLightActive,
    },
    red: {
      redBs,
      redBsHover,
      redBsActive,
    },
  },
};

export { theme };
