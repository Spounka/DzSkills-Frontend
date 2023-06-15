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
                    <Typography sx={{ '&:hover': { color: 'primary' } }}>
                        <NavLink to={'/profile/'}>الملف الشخصي</NavLink>
                    </Typography>
                    <Typography>
                        <Link to={'/profile/edit/'}>اعدادات الحساب</Link>
                    </Typography>
                    <Link to={'/support/'}>
                        <Typography>مساعدة</Typography>
                    </Link>
                    <Link to={'/logout/'}>
                        <Typography color={'error'}>تسجيل الخروج</Typography>
                    </Link>
                </Stack>
            </DropdownPopper>
            <nav
                style={{
                    backgroundColor: 'black',
                    display: 'grid',
                    paddingRight: theme.spacing(14),
                    paddingLeft: theme.spacing(14),
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
                        <NavLink
                            to="/courses"
                            style={{}}
                        >
                            كورسات
                        </NavLink>
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
                        <NavLink to="/contact">تواصل</NavLink>
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
            </nav>
        </>
    );
}
