import { Notifications } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack, useTheme } from '@mui/system';
import { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/png/logo@2x.png';
import { ReactComponent as Profile } from '../../assets/svg/Profile icon.svg';
import { DropdownPopper } from '../dropdown-popper';

export default function TopNavigationBar() {
    const theme = useTheme();
    const [popperActive, setPopperActive] = useState(false);
    const navRef = useRef(null);

    return (
        <>
            <DropdownPopper
                isOpen={popperActive}
                cardRef={navRef}
                placement="bottom-end"
            >
                <Stack
                    gap={2}
                    sx={{
                        direction: 'rtl',
                        pl: 2,
                    }}
                >
                    <Typography
                        onClick={() => setPopperActive(false)}
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                                transition: 'color 100ms ease-in-out',
                            },
                        }}
                    >
                        <NavLink to={'/profile/'}>الملف الشخصي</NavLink>
                    </Typography>
                    <Typography
                        onClick={() => setPopperActive(false)}
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                                transition: 'color 100ms ease-in-out',
                            },
                        }}
                    >
                        <Link to={'/profile/edit/'}>اعدادات الحساب</Link>
                    </Typography>
                    <Typography
                        onClick={() => setPopperActive(false)}
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                                transition: 'color 100ms ease-in-out',
                            },
                        }}
                    >
                        <Link to={'/support/'}>مساعدة</Link>
                    </Typography>
                    <Typography
                        color={'error'}
                        onClick={() => setPopperActive(false)}
                    >
                        <Link to={'/logout/'}>تسجيل الخروج</Link>
                    </Typography>
                </Stack>
            </DropdownPopper>
            <nav style={{ width: '100%' }}>
                <Box
                    sx={{
                        backgroundColor: 'black',
                        display: {
                            xs: 'none',
                            md: 'grid',
                        },
                        px: {
                            lg: theme.spacing(16),
                            xl: theme.spacing(26),
                            xs: theme.spacing(4),
                        },
                        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                        gap: {
                            xs: theme.spacing(2),
                            sm: theme.spacing(4),
                            md: theme.spacing(6),
                            lg: theme.spacing(8),
                        },
                        py: theme.spacing(3),
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
                            gridColumnEnd: {
                                md: 9,
                                lg: 8,
                            },
                            typography: 'subtitle1',
                            fontWeight: {
                                md: 500,
                                lg: 700,
                            },
                            color: 'white',
                            display: 'flex',
                            gap: {
                                lg: theme.spacing(5),
                                md: theme.spacing(6),
                            },
                        }}
                    >
                        <Typography
                            variant={'subtitle1'}
                            fontWeight={{ md: 500, lg: 600 }}
                            sx={{
                                transition: 'all ease 300ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink
                                to="/courses"
                                style={{}}
                            >
                                كورسات
                            </NavLink>
                        </Typography>

                        <Typography
                            variant={'subtitle1'}
                            fontWeight={{ md: 500, lg: 600 }}
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
                            fontWeight={{ md: 500, lg: 600 }}
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
                            fontWeight={{ md: 500, lg: 600 }}
                            sx={{
                                transition: 'all ease 100ms',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            <NavLink to="/support">تواصل</NavLink>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            gridColumnStart: 11,
                            gridColumnEnd: 13,
                            display: 'flex',
                            gap: theme.spacing(4),
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <Notifications
                            sx={{
                                fill: 'white',
                                height: theme.spacing(4),
                                width: theme.spacing(4),
                            }}
                        />

                        <IconButton
                            ref={navRef}
                            color={'secondary'}
                            onClick={() => setPopperActive(val => !val)}
                            sx={{
                                '& :hover': {
                                    color: 'primary.main',
                                    fill: 'primary.main',
                                },
                            }}
                        >
                            <Profile
                                style={{
                                    maxHeight: theme.spacing(3),
                                    maxWidth: theme.spacing(3),
                                    color: 'inherit',
                                    fill: 'inherit',
                                }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </nav>
        </>
    );
}
