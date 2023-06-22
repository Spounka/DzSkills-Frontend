import { Box, useTheme } from '@mui/material';
import Image from 'mui-image';
import logo from '../../assets/svg/DzSkills.svg';

function AuthenticationTopBar() {
    const theme = useTheme();
    return (
        <Box
            aria-label="white-navbar-container"
            sx={{
                width: '100%',
                justifyContent: 'flex-end',
                display: 'flex',
                px: {
                    xs: theme.spacing(4),
                    lg: theme.spacing(30),
                },
                py: 4,
            }}
        >
            <Image
                src={logo}
                fit="contain"
                alt=""
                style={{
                    maxWidth: theme.spacing(24),
                    width: '100%',
                    marginRight: 'auto',
                }}
            />
        </Box>
    );
}

export default AuthenticationTopBar;
