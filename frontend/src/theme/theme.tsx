import { createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

interface THEME_OPTIONS {
  option: ThemeOptions;
}

export const themeOptions: THEME_OPTIONS = {
  option: {
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  },
};

const theme = createTheme(themeOptions.option);

export default theme;
