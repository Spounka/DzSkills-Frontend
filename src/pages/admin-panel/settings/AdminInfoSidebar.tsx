import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import { AdminInfoNavbar } from './AdminInfoNavbar';
import useReduxData from '../../../stores/reduxUser';

export function AdminInfoSidebar({ }) {
    const user = useReduxData().user.user;
    return (
        <Box
            display="flex"
            flexDirection={'column'}
            gap={4}
            height={'100%'}
            width={'100%'}
            sx={{
                flexBasis: '40%',
            }}
        >
            <AdminInfoNavbar />
            <Box
                display={'flex'}
                sx={{
                    width: '100%',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Avatar
                    src={user?.profile_image ?? ''}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1/1',
                        flexBasis: '40%',
                    }}
                />
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Typography variant="body2">
                        {`${user?.first_name} ${user?.last_name}`}
                    </Typography>
                    <Typography variant="caption">
                        {`ID: ${user?.pk}`}
                    </Typography>
                    <NavLink to={'/logout'}>
                        <Typography
                            variant="body2"
                            color={'red'}
                        >
                            تسجيل الخروج
                        </Typography>
                    </NavLink>
                </Box>
            </Box>
        </Box>
    );
}
