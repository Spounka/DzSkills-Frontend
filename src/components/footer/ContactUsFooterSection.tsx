import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export function ContactUsFooterSection({}) {
    return (
        <>
            {' '}
            <Typography
                variant="h5"
                fontWeight={500}
            >
                تواصل معنا
            </Typography>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={2}
            >
                <Typography
                    variant="caption"
                    sx={{
                        direction: 'ltr',
                        textAlign: 'right',
                    }}
                >
                    +213 555555555
                </Typography>
                <Typography variant="caption">slaxsifou@gmail.com</Typography>
                <Typography variant="caption">شروط الإستخدام</Typography>
            </Box>
        </>
    );
}
