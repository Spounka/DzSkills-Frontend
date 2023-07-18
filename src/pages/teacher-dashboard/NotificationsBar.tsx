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
                p: 2,
                mt: 0,
                bgcolor: theme.palette.purple.light,
                color: 'white',
                borderRadius: `0 ${theme.spacing()} ${theme.spacing()} 0`,
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                position: 'fixed',
                left: 0,
                width: '20%',
                height: '100%',
                zIndex: '1',
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
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={2}
                >
                    <Avatar
                        sx={{
                            width: theme.spacing(6),
                            height: 'auto',
                            aspectRatio: '1',
                            flexGrow: '1',
                        }}
                    />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                    >
                        <Typography
                            variant={'caption'}
                            fontWeight={400}
                        >
                            اشتراك جديد
                        </Typography>
                        <Typography
                            variant={'caption'}
                            fontWeight={300}
                        >
                            قام اسم المستخدم بالاشتراك في كورس اسم الكورس
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display={'flex'}
                    gap={2}
                    justifyContent={'center'}
                >
                    <Avatar
                        sx={{
                            width: theme.spacing(6),
                            // height: theme.spacing(6),
                            height: 'auto',
                            aspectRatio: '1',
                            flexGrow: '1',
                        }}
                    />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                    >
                        <Typography
                            variant={'caption'}
                            fontWeight={400}
                        >
                            اشتراك جديد
                        </Typography>
                        <Typography
                            variant={'caption'}
                            fontWeight={300}
                        >
                            قام اسم المستخدم بالاشتراك في كورس اسم الكورس
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display={'flex'}
                    gap={2}
                    justifyContent={'center'}
                >
                    <Avatar
                        sx={{
                            width: theme.spacing(6),
                            height: 'auto',
                            aspectRatio: '1',
                            flexGrow: '1',
                        }}
                    />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                    >
                        <Typography
                            variant={'caption'}
                            fontWeight={400}
                        >
                            اشتراك جديد
                        </Typography>
                        <Typography
                            variant={'caption'}
                            fontWeight={300}
                        >
                            قام اسم المستخدم بالاشتراك في كورس اسم الكورس
                        </Typography>
                    </Box>
                </Box>
                <Box
                    display={'flex'}
                    gap={2}
                    justifyContent={'center'}
                >
                    <Avatar
                        sx={{
                            width: theme.spacing(6),
                            height: theme.spacing(6),
                            aspectRatio: '1/1',
                            flexGrow: '1',
                        }}
                    />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                    >
                        <Typography
                            variant={'caption'}
                            fontWeight={400}
                        >
                            اشتراك جديد
                        </Typography>
                        <Typography
                            variant={'caption'}
                            fontWeight={300}
                        >
                            قام اسم المستخدم بالاشتراك في كورس اسم الكورس
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}
export default TeacherAddCourse;
