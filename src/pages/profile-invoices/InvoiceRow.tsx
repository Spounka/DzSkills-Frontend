import { Box, Typography } from '@mui/material';
import { MainButton } from '../../components/ui/MainButton';
import { Order } from '../../types/payment';

interface props {
    order: Order;
}
export function InvoiceRow({ order }: props) {
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
            <Typography flexGrow={0}>{order.id}</Typography>
            <Typography
                flexGrow={0}
                alignSelf={'left'}
            >
                {new Date(order.date_issued).toLocaleDateString()}
            </Typography>
            <Typography flexGrow={1}>
                {stateFromCode(order.payment?.status || 'p')}
            </Typography>
            <Typography flexGrow={0}>{order.course?.price} DA</Typography>
            <a
                download
                href={order.payment.receipt}
            >
                <MainButton
                    text={'عرض'}
                    color={'primary.main'}
                />
            </a>
        </Box>
    );
}
