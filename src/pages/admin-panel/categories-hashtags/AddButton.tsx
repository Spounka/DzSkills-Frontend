import { Add } from '@mui/icons-material';
import { Button, useTheme } from '@mui/material';

export function AddButton({
    title,
    onClick,
}: {
    title: string;
    onClick?: (e?: any) => void;
}) {
    const theme = useTheme();
    return (
        <Button
            onClick={onClick}
            sx={{
                bgcolor: '#11111C',
                color: 'white',
                borderRadius: theme.spacing(0.5),
                pi: 2,
                py: 1,
                ':hover': {
                    bgcolor: '#11111C',
                    color: 'white',
                },
                '& .MuiButton-startIcon': {
                    mx: theme.spacing(0.2),
                },
            }}
            startIcon={<Add />}
        >
            {title}
        </Button>
    );
}
