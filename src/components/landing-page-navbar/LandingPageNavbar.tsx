import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/png/logo@2x.png';
import { LoginButton } from '../../pages/landing-page/LoginButton';
import { RegisterButton } from '../../pages/landing-page/RegisterButton';

interface LandingPageNavbarProps { }
export function LandingPageNavbar({ }: LandingPageNavbarProps) {
    const theme = useTheme();

    return (
        <nav style={{ width: '100%' }}>
            <Box
                sx={{
                    bgcolor: 'black',
                    display: {
                        xs: 'none',
                        md: 'grid',
                    },
                    px: {
                        md: theme.spacing(7),
                        lg: theme.spacing(14),
                    },
                    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                    gap: theme.spacing(8),
                    paddingTop: theme.spacing(3),
                    paddingBottom: theme.spacing(3),
                }}
            >
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt=""
                        style={{
                            gridColumnStart: 1,
                            gridColumnEnd: 3,
                            maxWidth: theme.spacing(18),
                        }}
                    />
                </Link>

                <Box
                    alignItems={'center'}
                    sx={{
                        gridColumnStart: 4,
                        gridColumnEnd: 8,
                        typography: 'subtitle1',
                        fontWeight: 700,
                        color: 'white',
                        display: 'flex',
                        gap: theme.spacing(5),
                    }}
                >
                    <Typography
                        variant={'subtitle1'}
                        fontWeight={600}
                        sx={{
                            transition: 'all ease 300ms',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        <NavLink to="/courses">كورسات</NavLink>
                    </Typography>

                    <Typography
                        variant={'subtitle1'}
                        fontWeight={600}
                        sx={{
                            transition: 'all ease 100ms',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        <NavLink to="/about">من نحن</NavLink>
                    </Typography>

                    <Typography
                        variant={'subtitle1'}
                        fontWeight={600}
                        sx={{
                            transition: 'all ease 100ms',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        <NavLink to="/teachers">المدربون</NavLink>
                    </Typography>

                    <Typography
                        variant={'subtitle1'}
                        fontWeight={600}
                        sx={{
                            transition: 'all ease 100ms',
                            '&:hover': {
                                color: 'primary.main',
                            },
                        }}
                    >
                        <NavLink to="/support/">تواصل</NavLink>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        gridColumnStart: 9,
                        gridColumnEnd: 13,
                        display: 'flex',
                        gap: theme.spacing(4),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <LoginButton />
                    <RegisterButton />
                </Box>
            </Box>
        </nav>
    );
}
