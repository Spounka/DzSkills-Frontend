import { Box, Typography, useTheme } from '@mui/material';
import { MainButton } from '../../components/ui/MainButton';
import { Order } from '../../types/payment';

interface props {
    order: Order;
}
export function InvoiceRow({ order }: props) {
    const theme = useTheme();
    function stateFromCode(s: string) {
        switch (s) {
            case 'p':
                return 'قيد الانتظار';
            case 'a':
                return 'مكتمل';
            case 'r':
                return 'مرفوض';
        }
    }
    return (
        <Box
            display={'flex'}
            gap={5}
            textAlign={'center'}
            alignItems={'center'}
        >
            <Typography flex={'1 0 1%'}>{order.id}</Typography>
            <Typography flex={'1 0 15%'}>{order.course.title}</Typography>
            <Typography
                flex={'1 0 15%'}
                justifySelf={'flex-start'}
                textAlign={'right'}
            >
                {new Date(order.date_issued).toLocaleDateString()}
            </Typography>
            <Typography
                flex={'1 0 15%'}
                textAlign={'right'}
            >
                {stateFromCode(order.payment?.status || 'p')}
            </Typography>
            <Typography
                flex={'1 1 15%'}
                textAlign={'right'}
            >
                {order.course?.price} DA
            </Typography>
            <a
                download
                href={order.payment.receipt}
                style={{
                    flex: '1 1 10%',
                }}
            >
                <MainButton
                    text={'عرض'}
                    color={theme.palette.primary.main}
                />
            </a>
        </Box>
    );
}
