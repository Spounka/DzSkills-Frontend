import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useLogin from '../authenticate/hooks/useLogin';
import { ProfileContent } from './ProfileContent';
import { useIsBanned } from '../banned-page/BannedPage';

function Profile() {
    const theme = useTheme();
    const [userQuery] = useLogin();
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;
    if (!userQuery.isSuccess) return <></>;
    return (
    <>
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                width: '100%',
                maxWidth: '100%',
                gap: theme.spacing(2),
                marginBottom: '5rem',
                px: {
                    xs: theme.spacing(0),
                    md: theme.spacing(3),
                    lg: theme.spacing(7),
                    xl: theme.spacing(7),
                },
                pt: theme.spacing(10),
                zIndex: 1,
            }}
        >
            <ProfileContent />
        </Box>

    </>
    );
}

export default Profile;
