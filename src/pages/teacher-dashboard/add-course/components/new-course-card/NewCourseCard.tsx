import { Divider, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box, useTheme } from '@mui/system';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MainButton } from '../../../../../components/ui/MainButton';
import AddChapterButton from '../add-chapter-button';
import { ChapterDetails } from '../chapter/ChapterDetails';
import { CourseFields } from '../course-fields/CourseFields';

export function NewCourseCard() {
    const theme = useTheme();
    const [chapters, setChapters] = useState<string[]>([uuidv4()]);

    function removeChapter(uuid: string) {
        setChapters((chaps: string[]) => {
            const v = [...chaps]
            v.splice(v.indexOf(uuid), 1);
            return v;
        })
    }

    return (
        <Card id='courses'
            elevation={0}
            sx={{
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
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                columnGap: theme.spacing(),
                flexGrow: '1',
                alignContent: 'center',
                alignItems: 'center',
                rowGap: theme.spacing(2),
            }}>
                <CourseFields />
            </Box>
            <Typography color={'purple.main'}>
                الفصول
            </Typography>
            <Divider />
            <Box gap={2} sx={{
                display: 'flex',
                flexWrap: 'wrap',
                borderRadius: theme.spacing(),

            }}
            >
                {chapters.map((value, index) => {
                    return <ChapterDetails
                        chapterIndex={index}
                        uuid={value}
                        key={value}
                        removeChapter={removeChapter} />
                })}
            </Box>

            <AddChapterButton setChapters={setChapters} />

            <MainButton
                color={theme.palette.primary.main}
                text='ارسل للمراجعة'
                type='submit' />
        </Card>);
}
