import { Button, useTheme } from "@mui/material";

interface props {
    text: string,
    color?: string | undefined,
}


export function MainButton({ text, color, ...other }: props) {
    const theme = useTheme();

    return <Button size="large" variant="contained" sx={{
        color: `${color || ""}`,
        border: `${color || theme.palette.secondary.main} 2px solid`,
        alignSelf: 'center',
        px: 5,
        borderRadius: '.5rem',
        transition: 'ease-in-out',
        transitionProperty: 'all',
        transitionDuration: '200ms',
        '&:hover': {
            bgcolor: 'white',
            border: `${color} 2px solid`
        }

    }}
        {...other}

    >
        {text}
    </Button>;
}
