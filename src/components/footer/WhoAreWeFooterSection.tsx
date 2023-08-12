import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export function WhoAreWeFooterSection({}) {
    return (
        <>
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
                <Link to={'/privacy/'}>
                    <Typography variant="caption">سياسة الخصوصية</Typography>
                </Link>

                <Typography variant="caption">
                    <Link to={'/support/'}>الأسئلة الشائعة</Link>
                </Typography>
                <Typography variant="caption">شروط الإستخدام</Typography>
            </Box>
        </>
    );
}
