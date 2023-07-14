import { Divider, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box, useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MainButton } from '../../../../../components/ui/MainButton';
import { Chapter, Course } from '../../../../../types/course';
import { CourseQuizz } from '../../../../../types/quizz';
import AddChapterButton from '../add-chapter-button';
import { ChapterDetails } from '../chapter/ChapterDetails';
import { CourseFields } from '../course-fields/CourseFields';
import Quizz from '../quizz';

interface props {
    quizz?: CourseQuizz;
    readonly?: boolean;
    course?: Course;
    color?: string;

    updateQuizzCallback?: (q: CourseQuizz) => void;
}
export function NewCourseCard({
    quizz,
    course,
    color,
    readonly,
    updateQuizzCallback,
}: props) {
    const theme = useTheme();
    const [chapters, setChapters] = useState<(Chapter & { uuid: string })[]>([]);

    function removeChapter(uuid: string) {
        setChapters(chaps => {
            const v = [...chaps];
            return v.filter(c => c.uuid !== uuid);
        });
    }

    useEffect(() => {
        if (course)
            setChapters(
                course.chapters.map(c => {
                    return { ...c, uuid: uuidv4() };
                })
            );
    }, [course?.description]);

    return (
        <Card
            id="courses"
            elevation={0}
            sx={{
                px: theme.spacing(3),
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: theme.spacing(2),
                boxShadow: '7px 20px 40px #00000014',
                borderRadius: theme.spacing(),
            }}
        >
            <Typography color={color || 'purple.main'}>معلومات الكورس</Typography>
            <Divider />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        md: 'repeat(2, minmax(0, 1fr))',
                    },
                    columnGap: theme.spacing(),
                    flexGrow: '1',
                    alignContent: 'center',
                    alignItems: 'center',
                    rowGap: theme.spacing(2),
                }}
            >
                <CourseFields
                    color={color}
                    stringColor="secondary"
                    readonly={readonly}
                    course={course}
                />
            </Box>
            <Typography color={color || 'purple.main'}>الفصول</Typography>
            <Divider />
            <Box
                gap={2}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    borderRadius: theme.spacing(),
                }}
            >
                {chapters.map((value, index) => {
                    return (
                        <ChapterDetails
                            readonly={readonly}
                            chapterIndex={index}
                            uuid={value.uuid}
                            key={value.uuid}
                            color={color}
                            courseChapter={value || null}
                            removeChapter={removeChapter}
                        />
                    );
                })}
            </Box>

            {!readonly && (
                <AddChapterButton
                    bgcolor={color}
                    setChapters={setChapters}
                />
            )}

            <Quizz
                color={color}
                quizzData={quizz}
                setQuizzData={updateQuizzCallback}
            />
            <Divider />
            <MainButton
                color={theme.palette.primary.main}
                text="ارسل للمراجعة"
                type="submit"
                {...{ sx: { alignSelf: 'flex-end' } }}
            />
        </Card>
    );
}
