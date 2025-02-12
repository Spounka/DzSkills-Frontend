import { Button, ButtonProps, SxProps, useTheme } from '@mui/material';
import { ReactNode } from 'react';

//@ts-ignore
interface props extends ButtonProps {
    text?: string;
    color?: string | undefined;
    sx?: SxProps;
    type?: 'button' | 'reset' | 'submit';
    spin?: boolean;
    children?: ReactNode;
}

export function MainButton({ text, color, sx, type, spin, children, ...other }: props) {
    const theme = useTheme();
    return (
        <Button
            size="large"
            className={'group'}
            variant="contained"
            type={type}
            sx={{
                bgcolor: `${color || theme.palette.secondary.main}`,
                color: spin ? 'transparent' : 'white',
                border: `${color || theme.palette.secondary.main} 2px solid`,
                alignSelf: 'center',
                px: 5,
                borderRadius: '.5rem .5rem .5rem .5rem !important',
                transition: 'ease-in-out',
                transitionProperty: 'all',
                transitionDuration: '200ms',
                '&:hover': {
                    bgcolor: 'white',
                    border: `${color} 2px solid`,
                    color: spin ? 'transparent' : `${color}`,
                    '.MuiButton-endIcon': {
                        stroke: color,
                        fill: color,
                    },
                },
                '.MuiButton-endIcon': {
                    transition: 'ease-in-out',
                    transitionProperty: 'all',
                    transitionDuration: '350ms',
                    stroke: `white`,
                    fill: `white`,
                },

                '&.Mui-disabled': {
                    border: `${theme.palette.gray.secondary} 2px solid`,
                },
                ...sx,
            }}
            disabled={spin}
            {...other}
        >
            {children}
            {spin && (
                <div className="h-6 w-6 border-t-2 mx-auto border-white group-hover:border-black rounded-t-full animate-spin">
                    {' '}
                </div>
            )}
            {!spin && text}
        </Button>
    );
}
