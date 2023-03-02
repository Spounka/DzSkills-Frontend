import { createTheme } from "@mui/material";
import {
    light,
    medium,
    regular,
    semibold,
} from "./assets/fonts/fonts";

declare module "@mui/material/styles" {
    interface Palette {
        gray: {
            main: string;
            secondary?: string;
            light?: string;
            dark?: string;
            title?: string;
            contrastText?: string;
        };
    }

    interface PaletteOptions {
        gray?: {
            main: string;
            secondary?: string;
            light?: string;
            dark?: string;
            title?: string;
            contrastText?: string;
        };
    }

    interface PaletteColor {
        darker?: string;
    }

    interface SimplePaletteColorOptions {
        darker?: string;
    }

    interface ThemeOptions {
        status: {
            danger: React.CSSProperties["color"];
        };
    }
}

declare module "@mui/material" {
    interface PaletteOptions {
        gray?: {
            main: string;
            secondary?: string;
            light?: string;
            dark?: string;
            contrastText?: string;
            title?: string;
        };
    }
}
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        gray: true;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#1AAC68",
        },
        secondary: {
            main: "#0081B4",
            dark: "#11111C",
        },
        gray: {
            main: "#A1A1A1",
            secondary: "#EBEBF3",
            light: "#CCCCCC",
            dark: "#51515D",
            title: "#2B2B2B",
        },
    },
    typography: {
        fontFamily: [
            "Montserrat Arabic",
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    components: {
        MuiCssBaseline: {
            // @ts-ignore
            "@global": {
                "@font-face": [light, medium, regular, semibold],
            },
        },
    },
});

export default theme;
