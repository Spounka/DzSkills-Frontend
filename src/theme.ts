import { createTheme } from '@mui/material';
import { light, medium, regular, semibold } from './assets/fonts/fonts';

declare module '@mui/material/styles' {
    interface Palette {
        gray: {
            main: string;
            secondary?: string;
            light?: string;
            dark?: string;
            title?: string;
            contrastText?: string;
        };
        purple: {
            main: string;
            secondary?: string;
            light?: string;
            dark?: string;
            darker?: string;
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
        purple?: {
            main: string;
            secondary?: string;
            light?: string;
            dark?: string;
            darker?: string;
            title?: string;
            contrastText?: string;
        };
    }

    interface PaletteColor {
        darker?: string;
        lighter?: string;
    }

    interface SimplePaletteColorOptions {
        darker?: string;
        lighter?: string;
    }

    interface ThemeOptions {
        status: {
            danger: React.CSSProperties['color'];
        };
    }
}

declare module '@mui/material' {
    interface PaletteOptions {
        gray?: {
            main: string;
            secondary?: string;
            light?: string;
            dark?: string;
            contrastText?: string;
            title?: string;
        };
        purple?: {
            main: string;
            secondary?: string;
            light?: string;
            dark?: string;
            darker?: string;
            title?: string;
            contrastText?: string;
        };
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        gray: true;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#1AAC68',
            light: '#4CE49D',
        },
        secondary: {
            main: '#0081B4',
            dark: '#11111C',
            lighter: '#50C1EE',
        },
        gray: {
            main: '#A1A1A1',
            secondary: '#EBEBF3',
            light: '#CCCCCC',
            dark: '#51515D',
            title: '#2B2B2B',
        },
        purple: {
            main: '#5353AD',
            light: '#58548E',
        },
    },
    typography: {
        fontFamily: [
            'Montserrat Arabic',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    components: {
        MuiCssBaseline: {
            // @ts-ignore
            '@global': {
                '@font-face': [light, medium, regular, semibold],
            },
        },
    },
});

export default theme;
