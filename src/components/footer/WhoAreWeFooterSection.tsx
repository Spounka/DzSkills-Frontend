import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export function WhoAreWeFooterSection({}) {
    return (
        <>
            {' '}
            <Typography
                variant="h5"
                fontWeight={500}
            >
                من نحن
            </Typography>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={2}
            >
                <Typography variant="caption">سياسة الخصوصية</Typography>
                <Typography variant="caption">الأسئلة الشائعة</Typography>
                <Typography variant="caption">شروط الإستخدام</Typography>
            </Box>
        </>
    );
}
