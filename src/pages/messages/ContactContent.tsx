import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { User } from '../../types/user';
import { CourseConversation } from './CourseConversation';
import { SupportPanels } from './SupportPanels';
import { useRouteID } from '../../globals/hooks';

interface ContactContentProps {
    user: User;
}
export function ContactContent({ user }: ContactContentProps) {
    const id = useRouteID();
    const theme = useTheme();

    return (
        <Box
            sx={{
                px: {
                    xs: 0,
                    lg: theme.spacing(6),
                    xl: theme.spacing(13),
                },
                width: '100%',
                maxHeight: `calc(100% - ${theme.spacing(20)} - 2rem)`,
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: { lg: 2, xs: 4 },
            }}
        >
            {id > 0 ? (
                <CourseConversation
                    id={id}
                    user={user}
                />
            ) : (
                <SupportPanels />
            )}
        </Box>
    );
}
