import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { Badge, Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import { ReactComponent as MoneyGreen } from '../../../assets/svg/money-white.svg';
import { ReactComponent as TimeOrange } from '../../../assets/svg/time-orange.svg';
import { ReactComponent as TimePurple } from '../../../assets/svg/time-purple.svg';
import { StyledCard } from '../../../components/StyledCard';
import { ReminderItem } from './itemProps';

export function Reminders({}) {
    const theme = useTheme();
    return (
        <StyledCard
            sx={{
                flexBasis: '50%',
                height: '100%',
            }}
        >
            <Typography
                variant={'h6'}
                color={'secondary.main'}
            >
                تذكير
            </Typography>
            <Divider />
            <Stack gap={3}>
                <ReminderItem
                    title={'اخر 24 ساعة'}
                    Icon={
                        <TimePurple
                            style={{
                                width: '100%',
                                height: '100%',
                                fill: 'white',
                            }}
                        />
                    }
                    color={'purple.main'}
                    subtitle="تم تسجيل 0 طالب جديد"
                />
                <ReminderItem
                    title={'رسائل غير مقروءة'}
                    Icon={
                        <Badge
                            badgeContent={0}
                            sx={{
                                bgcolor: 'gray.secondary',
                                borderRadius: '50%',
                                p: 1.5,
                            }}
                            color={'error'}
                        >
                            <ChatBubbleOutlineOutlined
                                fill={theme.palette.secondary.main}
                                color={'secondary'}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </Badge>
                    }
                    color={'secondary.main'}
                    subtitle="اطلع على الرسائل التي لم تقرأها بعد"
                />
                <ReminderItem
                    title={'تأكيد دفع'}
                    Icon={
                        <Box
                            sx={{
                                bgcolor: 'gray.secondary',
                                borderRadius: '50%',
                                p: 1.5,
                            }}
                        >
                            <MoneyGreen
                                style={{
                                    fill: theme.palette.primary.main,
                                    width: '100%',
                                    zIndex: 10,
                                    height: '100%',
                                }}
                            />
                        </Box>
                    }
                    color={'primary.main'}
                    subtitle="تأكيد مدفوعات للاشتراك في كورسات"
                />
                <ReminderItem
                    title={'في انتظار المراجعة'}
                    Icon={<TimeOrange style={{ width: '100%', height: '100%' }} />}
                    color={theme.palette.warning.light}
                    subtitle="يتم مراجعة هذه الطلبات من طرف الادارة"
                />
            </Stack>
        </StyledCard>
    );
}
