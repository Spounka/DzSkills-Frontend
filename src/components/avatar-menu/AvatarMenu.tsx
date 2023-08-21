import { DropdownPopper } from '../dropdown-popper';
import { User } from '../../types/user';
import { RefObject } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link, NavLink } from 'react-router-dom';

interface AvatarMenuProps {
    active: boolean;
    navRef: RefObject<HTMLElement>;
    user: User;
    onClick: (b: boolean) => void;
}
export function AvatarMenu({ active, navRef, user, onClick }: AvatarMenuProps) {
    return (
        <>
            <DropdownPopper
                clickAway={() => onClick(false)}
                isOpen={active}
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
                        onClick={() => onClick(false)}
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
                        onClick={() => onClick(false)}
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
                        onClick={() => onClick(false)}
                        sx={{
                            '&:hover': {
                                color: 'primary.main',
                                transition: 'color 100ms ease-in-out',
                            },
                        }}
                    >
                        <Link to={'/support/'}>مساعدة</Link>
                    </Typography>

                    {user.groups.some(
                        g => g.name == 'TeacherGroup' || g.name == 'AdminGroup'
                    ) ? (
                        <Typography
                            onClick={() => onClick(false)}
                            sx={{
                                '&:hover': {
                                    color: 'primary.main',
                                    transition: 'color 100ms ease-in-out',
                                },
                            }}
                        >
                            <Link to={'/dashboard/teacher/'}>لوحة تحكم المرشد</Link>
                        </Typography>
                    ) : (
                        <></>
                    )}
                    {user.groups.some(g => g.name == 'AdminGroup') ? (
                        <Typography
                            onClick={() => onClick(false)}
                            sx={{
                                '&:hover': {
                                    color: 'primary.main',
                                    transition: 'color 100ms ease-in-out',
                                },
                            }}
                        >
                            <Link to={'/admin/'}>لوحة تحكم المسؤول</Link>
                        </Typography>
                    ) : (
                        <></>
                    )}

                    <Typography
                        color={'error'}
                        onClick={() => onClick(false)}
                    >
                        <Link to={'/logout/'}>تسجيل الخروج</Link>
                    </Typography>
                </Stack>
            </DropdownPopper>
        </>
    );
}
