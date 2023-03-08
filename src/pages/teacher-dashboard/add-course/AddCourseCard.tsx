import { Divider, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box, useTheme } from '@mui/system';
import { ChapterDetails } from './ChapterDetails';
import { CourseDetails } from './CourseDetails';

export function AddCourseCard({ upload }: any) {
    const theme = useTheme();
    return (
        <Card elevation={0} sx={{
            px: theme.spacing(3),
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            gap: theme.spacing(2),
            boxShadow: '7px 20px 40px #00000014',
            borderRadius: theme.spacing()
        }}>
            <Typography color={'purple.main'}>
                معلومات الكورس
            </Typography>
            <Divider />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                columnGap: theme.spacing(),
                flexGrow: '1',
                alignContent: 'center',
                alignItems: 'center',
                rowGap: theme.spacing(2) // height: '100%',
            }}>
                <CourseDetails upload={upload} />
            </Box>
            <Typography color={'purple.main'}>
                الفصول
            </Typography>
            <Divider />
            <Box gap={2} sx={{
                display: 'flex',
                bgcolor: 'purple.light',
                px: 14,
                py: 6,
                flexWrap: 'wrap',
                borderRadius: theme.spacing()
            }}
            >
                <ChapterDetails upload={upload} />
            </Box>
        </Card>);
}
