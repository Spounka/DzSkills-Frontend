import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/ui/MainButton';
import { Order } from '../../types/payment';

interface props {
    order: Order;
}
export function InvoiceRow({ order }: props) {
    const theme = useTheme();
    const navigate = useNavigate();
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
            display={'grid'}
            gridTemplateColumns={'repeat(16, minmax(0,1fr))'}
            gap={3}
            textAlign={'center'}
            alignItems={'center'}
            sx={{
                py: 2,
                px: 2,
                cursor: order.payment?.status === 'a' ? 'pointer' : 'default',
                '&:hover': {
                    borderRadius: theme.spacing(),
                    bgcolor:
                        order.payment?.status === 'a'
                            ? theme.palette.gray.light
                            : 'none',
                },
            }}
            onClick={() => {
                if (order.payment?.status === 'a')
                    navigate(`/courses/${order.course.id}/watch/`);
            }}
        >
            <Typography
                flex={'1 0 1%'}
                gridColumn={'span 1'}
            >
                {order.id}
            </Typography>
            <Typography
                gridColumn={'span 4'}
                flex={'1 0 15%'}
            >
                {order.course.title}
            </Typography>
            <Typography
                gridColumn={'span 4'}
                flex={'1 0 10%'}
                justifySelf={'flex-start'}
                textAlign={'right'}
            >
                {new Date(order.date_issued).toLocaleDateString()}
            </Typography>
            <Typography
                gridColumn={'span 3'}
                flex={'1 0 15%'}
                textAlign={'right'}
            >
                {stateFromCode(order.payment?.status ?? 'p')}
            </Typography>
            <Typography
                gridColumn={'span 3'}
                flex={'1 1 15%'}
                textAlign={'right'}
            >
                {order.course?.price} DA
            </Typography>
            <Box
                sx={{
                    gridColumn: '-1',
                    display: 'flex',
                    gap: 3,
                    justifyContent: 'space-between',
                }}
            >
                <a
                    download
                    href={order.payment.receipt}
                >
                    <MainButton
                        text={'عرض'}
                        color={theme.palette.primary.main}
                    />
                </a>
            </Box>
        </Box>
    );
}
