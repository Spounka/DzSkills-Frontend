import { Box, Card, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


function PermissionDeniedPage() {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '85dvh',
                py: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Card
                elevation={0}
                sx={{
                    py: 4,
                    px: 15,
                    borderRadius: 4,
                    boxShadow: '0 5px 10px #0000001A',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                }}
            >
                <Typography
                    variant={'h6'}
                    color={'red'}
                >
                    تم رفض الإذن لعرض الصفحة
                </Typography>
                <Typography
                    variant={'body1'}
                    color={'secondary'}
                >
                    <NavLink to={'/'}>العودة إلى الصفحة الرئيسية</NavLink>
                </Typography>
            </Card>
        </Box>
    );
}

export default PermissionDeniedPage;
