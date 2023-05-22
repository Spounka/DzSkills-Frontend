import { Typography, useTheme } from '@mui/material';
import { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

interface AdminInfoSidebarLinkProps {
    url: string;
    label: string;
}
export function AdminInfoSidebarLink({
    url,
    label,
}: AdminInfoSidebarLinkProps) {
    const theme = useTheme();
    const commonStyle: CSSProperties = {
        display: 'flex',
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        gap: theme.spacing(2),
        alignItems: 'center',
    };
    const activeStyle = {
        ...commonStyle,
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        borderRadius: theme.spacing(),
        color: theme.palette.secondary.main,
    };

    const inactiveStyle = {
        ...commonStyle,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        color: theme.palette.gray.light,
        borderRadius: 0,
        backgroundColor: 'transparent',
    };

    return (
        <NavLink
            to={url}
            style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
            {({ isActive }) => (
                <Typography
                    variant={'subtitle1'}
                    fontWeight={isActive ? 500 : 400}
                >
                    {label}
                </Typography>
            )}
        </NavLink>
    );
}
