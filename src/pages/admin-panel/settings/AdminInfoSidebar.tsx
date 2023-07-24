import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import useLogin from '../../authenticate/hooks/useLogin';
import { AdminInfoNavbar } from './AdminInfoNavbar';

export function AdminInfoSidebar({}) {
    const user = useLogin();
    return (
        <Box
            display="flex"
            flexDirection={'column'}
            gap={4}
            height={'100%'}
            width={'100%'}
            sx={{
                flexBasis: '40%',
                // position: 'fixed',
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
                    src={user[0].data?.profile_image ?? ''}
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
                        {`${user[0].data?.first_name} ${user[0].data?.last_name}`}
                    </Typography>
                    <Typography variant="caption">
                        {`ID: ${user[0].data?.pk}`}
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
