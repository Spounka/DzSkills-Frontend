import { Card, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface sidebarProps {
    url: string;
    text: string;
    color?: string;
    props?: NavLinkProps;
}

const SideBarLink = ({ url, text, props }: sidebarProps) => {
    const theme = useTheme();
    return (
        <NavLink
            to={url}
            {...props}
            style={({ isActive }) =>
                isActive
                    ? { color: theme.palette.primary.main }
                    : { color: theme.palette.gray.dark }
            }
        >
            <Typography
                fontWeight={600}
                variant="subtitle1"
                sx={{
                    p: `${theme.spacing(2)} ${theme.spacing(4)}`,
                }}
            >
                {text}
            </Typography>
        </NavLink>
    );
};

const SideBar = () => {
    const theme = useTheme();
    return (
        <Card
            sx={{
                width: 'full',
                height: 'full',
                boxShadow: '0px 5px 15px #00000029',
                borderRadius: theme.spacing(2),
                mt: theme.spacing(1),
                py: theme.spacing(5),
            }}
            elevation={0}
        >
            <SideBarLink
                url={'/profile/edit'}
                text={'الملف الشخصي'}
                color={theme.palette.primary.main}
            />
            {/* <SideBarLink
                url={'/profile/courses'}
                text={'كورساتي'}
                color={theme.palette.primary.main}
            /> */}
            <SideBarLink
                url={'/profile/cart'}
                text={'الطلبات والفواتير'}
                color={theme.palette.primary.main}
            />
            {/* <SideBarLink
                url={'/profile/delete'}
                text={'حذف الحساب'}
                color={theme.palette.primary.main}
            /> */}
        </Card>
    );
};

export default SideBar;
