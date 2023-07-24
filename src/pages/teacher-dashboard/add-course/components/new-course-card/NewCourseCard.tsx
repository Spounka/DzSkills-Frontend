import { Backdrop, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box, useTheme } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MainButton } from '../../../../../components/ui/MainButton';
import axiosInstance from '../../../../../globals/axiosInstance';
import {
    Category,
    Course,
    CreationChapter,
    Hashtag,
    Level,
} from '../../../../../types/course';
import { CourseQuizz } from '../../../../../types/quizz';
import AddChapterButton from '../add-chapter-button';
import { ChapterDetails } from '../chapter/ChapterDetails';
import { CourseFields } from '../course-fields/CourseFields';
import Quizz from '../quizz';

interface props {
    readonly?: boolean;
    course?: Course;
    color?: string;
    hashtags?: Hashtag[];
    isSubmitting?: boolean;

    setHashtags?: (h: Hashtag[]) => void;
    setLevel?: (l: Level) => void;
    setCategory?: (c: Category) => void;
    updateQuizzCallback?: (q: CourseQuizz) => void;
}
export function NewCourseCard({
    course,
    color,
    readonly,
    isSubmitting: globalSubmitting,
    setHashtags,
    setLevel,
    setCategory,
    updateQuizzCallback,
}: props) {
    const theme = useTheme();
    const [chapters, setChapters] = useState<CreationChapter[]>([]);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const client = useQueryClient();

    function removeChapter(uuid: string) {
        setChapters(chaps => {
            const v = [...chaps];
            return v.filter(c => c.uuid !== uuid);
        });
    }

    const statusMutation = useMutation({
        mutationKey: ['course', 'accept'],
        mutationFn: ({ status }: { status: string }) => {
            setIsSubmitting(true);
            return (async () => {
                return await axiosInstance.patch(`/courses/${course?.id}/${status}/`);
            })();
        },
        onSuccess: ({ data }: { data: Course }) => {
            if (data?.status === 'app')
                enqueueSnackbar('تم قبول الدورة بنجاح', {
                    variant: 'success',
                    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                });
            else if (data.status === 'edi')
                enqueueSnackbar('تم طلب المراجعة بنجاح', {
                    variant: 'warning',
                    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                });
            else
                enqueueSnackbar('تم رفض الدورة بنجاح', {
                    variant: 'error',
                    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                });
            client.refetchQueries({ queryKey: ['courses'] });
            navigate('/admin/courses/');
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ', {
                variant: 'error',
                anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
            });
            setIsSubmitting(false);
        },
    });

    useEffect(() => {
        if (course)
            setChapters(
                course.chapters.map(c => {
                    return { ...c, uuid: uuidv4() };
                })
            );
    }, [course?.description]);

    return (
        <>
            <Backdrop
                open={isSubmitting}
                sx={{ zIndex: 100 }}
            >
                <CircularProgress color={'secondary'} />
            </Backdrop>
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
                    position: 'relative',
                }}
            >
                <Typography color={color ?? 'purple.main'}>معلومات الكورس</Typography>
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
                        setHashtags={setHashtags}
                        setLevel={setLevel}
                        setCategory={setCategory}
                        color={color}
                        stringColor="secondary"
                        readonly={readonly}
                        course={course}
                    />
                </Box>
                <Typography color={color ?? 'purple.main'}>الفصول</Typography>
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
                                uuid={value.uuid ?? ''}
                                key={value.uuid ?? index}
                                color={color}
                                courseChapter={value || null}
                                setChapters={setChapters}
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
                    readonly={readonly}
                    quizzData={course?.quizz}
                    setQuizzData={updateQuizzCallback}
                />
                <Divider />
                <Stack
                    direction="row"
                    justifyContent={readonly ? 'space-between' : 'flex-end'}
                    width={'100%'}
                    gap={4}
                >
                    {readonly ? (
                        <>
                            <MainButton
                                color={theme.palette.error.main}
                                text="رفض الكورس"
                                type="submit"
                                {...{ sx: { justifySelf: 'flex-start' } }}
                                onClick={() =>
                                    statusMutation.mutate({ status: 'reject' })
                                }
                            />

                            <Box
                                gap={4}
                                display={'flex'}
                            >
                                <MainButton
                                    color={theme.palette.gray.main}
                                    text="طلب تعديل"
                                    type="submit"
                                    {...{
                                        sx: {
                                            placeSelf: 'flex-end',
                                        },
                                        disabled: isSubmitting || globalSubmitting,
                                    }}
                                    onClick={() =>
                                        statusMutation.mutate({ status: 'edit' })
                                    }
                                />

                                <MainButton
                                    color={theme.palette.primary.main}
                                    text="تأكيد الكورس"
                                    type="submit"
                                    {...{
                                        sx: {
                                            placeSelf: 'flex-end',
                                        },
                                        disabled: isSubmitting || globalSubmitting,
                                    }}
                                    onClick={() =>
                                        statusMutation.mutate({ status: 'approve' })
                                    }
                                />
                            </Box>
                        </>
                    ) : (
                        <>
                            <MainButton
                                color={theme.palette.primary.main}
                                text="ارسل للمراجعة"
                                type="submit"
                                {...{
                                    sx: { placeSelf: 'flex-end' },
                                    disabled: isSubmitting || globalSubmitting,
                                }}
                            />
                        </>
                    )}
                </Stack>
            </Card>
        </>
    );
}
