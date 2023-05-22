import { Add } from '@mui/icons-material';
import { Button, useTheme } from '@mui/material';

export function AddButton({ title }: { title: string }) {
    const theme = useTheme();
    return (
        <Button
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
