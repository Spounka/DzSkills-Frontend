import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

export function EditProfileColumn({ children }: any) {
    const theme = useTheme();
    return (
        <Box sx={{
            width: "full",
            display: 'flex',
            flexGrow: '1',
            gap: theme.spacing(2)
        }}>
            {children}
        </Box>
    );
}
