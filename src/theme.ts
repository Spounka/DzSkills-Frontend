import { createTheme } from '@mui/material';
import { arSA } from '@mui/material/locale';
import { light, medium, regular, semibold } from './assets/fonts/fonts';

declare module '@mui/material/styles' {
    interface Palette {
        gray: Palette['primary'];
        purple: Palette['primary'];
        yellow: Palette['primary'];
        error_light?: Palette['error'];
    }

    interface PaletteOptions {
        gray?: PaletteOptions['primary'];
        purple?: PaletteOptions['primary'];
        yellow?: PaletteOptions['primary'];
        error_light?: Palette['error'];
    }

    interface PaletteColor {
        darker?: string;
        secondary?: string;
        lighter?: string;
        title?: string;
    }

    interface SimplePaletteColorOptions {
        darker?: string;
        lighter?: string;
        secondary?: string;
        title?: string;
    }
    interface PurpleColorOptions {
        main?: string;
        light?: string;
    }
    interface PurpleColorPalette {
        main: string;
        light: string;
    }
}

declare module '@mui/material/Checkbox' {
    interface CheckboxPropsColorOverrides {
        gray: true;
        purple: true;
        yellow: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        gray: true;
        purple: true;
        yellow: true;
    }
}
declare module '@mui/material/OutlinedInput' {
    interface OutlinedInputPropsColorOverrides {
        gray: true;
        purple: true;
        yellow: true;
    }
}
export interface FormControlPropsColorOverrides {
    gray: true;
    purple: true;
    yellow: true;
}

declare module '@mui/material/Radio' {
    interface RadioPropsColorOverrides {
        gray: true;
        purple: true;
        yellow: true;
    }
}

const theme = createTheme(
    {
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
            yellow: {
                main: '#F7C04A',
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
        direction: 'rtl',
    },

    arSA
);

export default theme;
