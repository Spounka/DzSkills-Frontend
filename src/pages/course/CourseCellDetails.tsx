import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface CourseCellDetailsProps {
    text: string;
    title: string;
}
export function CourseCellDetails({ text, title }: CourseCellDetailsProps) {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            flex={{
                xs: '0 1 40%',
                lg: '1 1',
            }}
            width={'100%'}
            maxWidth={{ xs: '25vw', lg: 'auto' }}
        >
            <Typography variant={'h6'}>{title}</Typography>
            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
            >
                {text}
            </Typography>
        </Box>
    );
}
