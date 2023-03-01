import { Button } from "@mui/material";

interface props {
    text: string,
    color: string,
}


export function MainButton({ text, color, ...other }: props) {

    return <Button size="large" variant="contained" color={"secondary"} sx={{
        border: `${color} 2px solid`,
        alignSelf: 'center',
        px: 5,
        borderRadius: '.5rem',
        transition: 'ease-in-out',
        transitionProperty: 'all',
        transitionDuration: '200ms',
        '&:hover': {
            bgcolor: 'white',
            color: { color },
            border: `${color} 2px solid`
        }

    }}
        {...other}

    >
        {text}
    </Button>;
}
