import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface CourseCellDetailsProps {
    text: string;
    title: string;
}
export function CourseCellDetails({ text, title }: CourseCellDetailsProps) {
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'h6'}>
                {title}
            </Typography>
            <Typography variant={'subtitle2'} color={'gray.main'}>
                {text}
            </Typography>
        </Box>);
}
