import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';

export default function EditProfileColumn({ children }: any) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: 'full',
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                flexGrow: '1',
                maxHeight: '100%',
                gap: theme.spacing(2),
            }}
        >
            {children}
        </Box>
    );
}
