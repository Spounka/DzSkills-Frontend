import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import {
    Badge,
    Box,
    CircularProgress,
    Divider,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { ReactComponent as MoneyGreen } from '../../../assets/svg/money-nocolor.svg';
import { ReactComponent as TimeOrange } from '../../../assets/svg/time-orange.svg';
import { ReactComponent as TimePurple } from '../../../assets/svg/time-purple.svg';
import { StyledCard } from '../../../components/StyledCard';
import axiosInstance from '../../../globals/axiosInstance';
import { MoneyRequest } from '../../../types/account-balance';
import { ReminderItem } from './ReminderItem';

interface Props {
    balance: number;
}

export function Reminders({ balance }: Props) {
    const theme = useTheme();
    const submitPaymentMutation = useMutation({
        mutationKey: ['submitAccount'],
        mutationFn: async () => {
            if (balance < 1000) {
                enqueueSnackbar('رصيد حساب أقل من 1000 دج', { variant: 'error' });
                return Promise.reject('balance too small');
            }
            const { data } = await axiosInstance.post('/balance/request/', {
                amount: balance,
            });
            return data as MoneyRequest;
        },
        onSuccess: () => {
            enqueueSnackbar('تم إرسال طلب الأموال بنجاح', { variant: 'success' });
        },
        onError: () => {
            enqueueSnackbar('فشل طلب سحب الأموال', { variant: 'error' });
        },
    });
    return (
        <StyledCard
            sx={{
                flexBasis: '40%',
                height: '100%',
            }}
        >
            <Typography
                variant={'h6'}
                color={'purple.main'}
            >
                تذكير
            </Typography>
            <Divider />
            <Stack gap={3}>
                <ReminderItem
                    title={'اخر 24 ساعة'}
                    Icon={<TimePurple style={{ width: '100%', height: '100%' }} />}
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
                                fill={theme.palette.purple.main}
                                //@ts-expect-error
                                color={'purple'}
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
                    onClick={() => submitPaymentMutation.mutate()}
                    Icon={
                        <Box
                            sx={{
                                bgcolor: 'gray.secondary',
                                borderRadius: '50%',
                                p: 1.5,
                            }}
                        >
                            {submitPaymentMutation.isLoading ? (
                                <CircularProgress
                                    //@ts-ignore
                                    color="purple"
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            ) : (
                                <MoneyGreen
                                    style={{
                                        fill: theme.palette.primary.main,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            )}
                        </Box>
                    }
                    color={'primary.main'}
                    subtitle="تأكيد مدفوعات للاشتراك في كورسات"
                />{' '}
                <ReminderItem
                    title={'اخر 24 ساعة'}
                    Icon={<TimeOrange style={{ width: '100%', height: '100%' }} />}
                    color={theme.palette.warning.light}
                    subtitle="يتم مراجعة هذه الطلبات من طرف الادارة"
                />
            </Stack>
        </StyledCard>
    );
}
