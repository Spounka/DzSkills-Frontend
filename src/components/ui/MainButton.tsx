import { Button, SxProps, useTheme } from "@mui/material";

interface props {
    text: string,
    color?: string | undefined,
    sx?: SxProps,
    type?: "button" | 'reset' | 'submit';
}


export function MainButton({ text, color, sx, type, ...other }: props) {
    const theme = useTheme();

    return <Button size="large"
        variant="contained"
        type={type}
        sx={{
            bgcolor: `${color || theme.palette.secondary.main}`,
            color: 'white',
            border: `${color || theme.palette.secondary.main} 2px solid`,
            alignSelf: 'center',
            px: 5,
            borderRadius: '.5rem .5rem .5rem .5rem !important',
            transition: 'ease-in-out',
            transitionProperty: 'all',
            transitionDuration: '200ms',
            ...sx,
            '&:hover': {
                bgcolor: 'white',
                border: `${color} 2px solid`,
                color: `${color}`,
            }
        }}
        {...other}

    >
        {text}
    </Button>;
}
