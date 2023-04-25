import { Avatar, Divider, Typography, colors, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

interface props {
    payment: any
}

export function PaymentDetails({ payment }: props) {
    const theme = useTheme();
    function statusFromCode() {
        switch (payment.status) {
            case 'p':
                return 'معلق';
            case 'a':
                return 'مكتمل';
            case 'r':
                return 'مرفوض'
        }
    }
    return (
        <Box display="flex" alignItems={'center'} gap={5} justifyContent={"space-between"}
            px={2}
        >
            <Avatar src={payment.order.buyer.profile_image}>H</Avatar>
            <Typography variant={'body2'} sx={{
                flexGrow: 0,
                flexBasis: '10%',
            }}>
                {payment.order.course.title}
            </Typography>
            <Typography variant={'button'} color={'gray.main'} flexBasis={'2%'}>
                {payment.id}
            </Typography>
            <Typography variant={'button'} color={'gray.main'} flexBasis={'10%'}>
                {payment.order.date_issued}
            </Typography>
            <Typography variant={'button'} color={'gray.main'} flexGrow={1} flexBasis={'5%'}>
                {payment.order.buyer.username}
            </Typography>
            <Typography variant={'button'} color={'gray.main'} flexGrow={1} sx={{
                direction: 'ltr',
                textAlign: 'right',
                flexBasis: '8%',

            }}>
                {`${payment.order.course.price} DA`}
            </Typography>
            <Typography variant={'button'} color={'gray.main'} flexGrow={1} flexBasis={'10%'}>
                {statusFromCode()}
            </Typography>
            <a href={payment.receipt} target="_blank" style={{
                color: colors.yellow[700]
            }} >
                عرض
            </a>
        </Box>
    );
}
