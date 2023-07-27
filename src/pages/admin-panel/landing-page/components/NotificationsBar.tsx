import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface NotificationsProps {
    drawerOpen: boolean;
    mainColor: string | undefined;
}
export function NotificationsBar({ drawerOpen, mainColor }: NotificationsProps) {
    const theme = useTheme();
    return (
        <Card
            aria-label="notifcations-bar"
            sx={{
                transition: 'all ease-out 300ms',
                transform: drawerOpen ? 'translate(0, 0)' : 'translate(-105%, 0)',
                p: 2,
                mt: 0,
                bgcolor: mainColor ?? theme.palette.purple.light,
                color: 'white',
                borderRadius: `0 ${theme.spacing()} ${theme.spacing()} 0`,
                display: 'flex',
                flexDirection: 'column',
                gap: 7,
                position: 'fixed',
                left: 0,
                width: '20%',
                height: '100%',
                zIndex: 4,
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
            >
                <Typography>لا يوجد أي إشعارات</Typography>
            </Box>
        </Card>
    );
}

function Notification({}) {
    const theme = useTheme();
    return (
        <Box
            display={'flex'}
            gap={2}
        >
            <Avatar
                sx={{
                    width: theme.spacing(6),
                    height: theme.spacing(6),
                    aspectRatio: '1/1',
                }}
            />
            <Box
                display={'flex'}
                flexDirection={'column'}
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
    );
}
