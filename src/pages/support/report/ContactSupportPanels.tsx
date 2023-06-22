import { Box, useTheme } from '@mui/material';
import { AdminContacts } from './AdminContacts';
import { SupportForm } from './SupportForm';

export function ContactSupportPanels() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                px: {
                    lg: theme.spacing(16),
                    xl: theme.spacing(26),
                    xs: theme.spacing(4),
                },
                pb: 0,
                width: '100%',
                // height: '100%',
                // minHeight: '90vh',
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: {
                    xs: 'column-reverse',
                    lg: 'row',
                },
                justifyContent: 'flex-start',
                gap: 2,
            }}
        >
            <SupportForm />
            <AdminContacts />
        </Box>
    );
}
