import { Avatar, Card, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { TeacherAddCourse } from './add-course';

interface NotificationsProps {
    drawerOpen: boolean;
}
export function NotificationsBar({ drawerOpen }: NotificationsProps) {
    const theme = useTheme();
    return (
        <Card
            sx={{
                transition: 'all ease-out 300ms',
                transform: drawerOpen ? 'translate(0, 0)' : 'translate(-105%, 0)',
                display: 'flex',
                p: 2,
                mt: 0,
                bgcolor: theme.palette.purple.light,
                color: 'white',
                borderRadius: `0 ${theme.spacing()} ${theme.spacing()} 0`,
                flexDirection: 'column',
                gap: 7,
                position: 'fixed',
                left: 0,
                width: drawerOpen ? '20%' : 0,
                height: '100%',
                zIndex: drawerOpen ? 1 : '-100',
            }}
        >
            <Typography
                variant={'subtitle2'}
                fontWeight={400}
            >
                التنبيهات
            </Typography>
            <Box
                gap={2}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Typography>لا يوجد أي إشعارات</Typography>
            </Box>
        </Card>
    );
}
export default TeacherAddCourse;
