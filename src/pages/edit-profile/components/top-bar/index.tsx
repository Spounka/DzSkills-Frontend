import { Notifications, ShoppingBag } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/system';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/png/logo@2x.png';
import Profile from '../../../../assets/svg/Profile icon.svg';

export default function TopNavigationBar() {
    const theme = useTheme();

    return <nav style={{
        backgroundColor: 'black',
        display: 'grid',
        paddingRight: theme.spacing(14),
        paddingLeft: theme.spacing(14),
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        gap: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    }}>
        <img src={logo} alt="" style={{
            gridColumnStart: 1,
            gridColumnEnd: 3,
            maxWidth: theme.spacing(18),
        }} />

        <Box alignItems={'center'} sx={{
            gridColumnStart: 4,
            gridColumnEnd: 8,
            typography: 'subtitle1',
            fontWeight: 700,
            color: 'white',
            display: 'flex',
            gap: theme.spacing(5)
        }}>
            <Link to="/courses">
                كورسات
            </Link>
            <Link to="/about">
                من نحن
            </Link>
            <Link to="/teachers">
                المدربون
            </Link>
            <Link to="/contact">
                تواصل
            </Link>
        </Box>
        <Box sx={{
            gridColumnStart: 11,
            gridColumnEnd: 13,
            display: 'flex',
            gap: theme.spacing(4),
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Notifications sx={{
                fill: 'white',
                height: theme.spacing(4),
                width: theme.spacing(4),
            }} />
            <ShoppingBag sx={{
                fill: 'white',
                height: theme.spacing(4),
                width: theme.spacing(4),
            }} />
            <img src={Profile} style={{
                maxHeight: theme.spacing(3),
                maxWidth: theme.spacing(3),
            }} />
        </Box>
    </nav>;

}
