import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export function MiscLinksFooterSection({}) {
    return (
        <>
            {' '}
            <Typography
                variant="h5"
                fontWeight={500}
            >
                روابط
            </Typography>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={2}
            >
                <Typography variant="caption">مدونة الموقع</Typography>
                <Typography variant="caption">انضم الى المدربين</Typography>
                <Typography variant="caption">مركز المساعدة</Typography>
                <Typography variant="caption">
                    <Link to={'/support/report/'}>أبلغ عن مستخدم</Link>
                </Typography>
            </Box>
        </>
    );
}
