import { LinearProgress, Stack, Typography } from '@mui/material';
import { AxiosProgressEvent } from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Category, Hashtag, Level } from '../../../types/course';
import { CourseQuizz } from '../../../types/quizz';
import useLogin from '../../authenticate/hooks/useLogin';
import TeacherDashboardLayout from '../layout';
import { submitCourse } from './api/submitCourse';
import { NewCourseCard } from './components/new-course-card/NewCourseCard';

export function TeacherAddCourse() {
    useLogin();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [quizz, setQuizz] = React.useState<CourseQuizz>();
    const updateQuizz = (q: CourseQuizz) => {
        setQuizz(q);
    };

    const [hashtags, setHashtags] = React.useState<Hashtag[]>([]);
    const [category, setCategory] = React.useState<
        Partial<Category> & { name: string; id: number }
    >({
        name: '',
        id: 0,
    });
    const [level, setLevel] = React.useState<
        Partial<Level> & { name: string; id: number }
    >({ name: '', id: 0 });

    const updateQuizzCallback = useCallback(updateQuizz, [quizz]);
    const navigate = useNavigate();
    const x = useSnackbar();
    const uploadProgress = (e: AxiosProgressEvent) => {
        setProgress((e.loaded / (e.total ?? 1)) * 100);
    };

    const submitCourseMutation = useMutation({
        mutationFn: (p: any) => submitCourse(p, uploadProgress),
        mutationKey: ['course-submit'],
        onSuccess: () => {
            setProgress(0);
            setIsSubmitting(false);
            x.enqueueSnackbar('تم تحميل الدورة بنجاح', {
                variant: 'success',
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
            });
            setTimeout(() => {
                navigate('/dashboard/teacher/courses/');
            }, 2500);
        },
        onError: () => {
            setProgress(0);
            setIsSubmitting(false);
            x.enqueueSnackbar('حدث خطأ', {
                variant: 'error',
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
            });
        },
    });

    async function mutate(e: any) {
        window.scrollTo({ top: 0 });
        setIsSubmitting(true);
        e.preventDefault();
        const form = document.querySelector('form');
        if (form) {
            let formData = new FormData(form);
            if (quizz)
                formData.append('quizz', JSON.stringify(quizz));
            formData.append('hashtags', JSON.stringify({ objs: hashtags }));
            formData.append('category', category.id.toString());
            formData.append('course_level', level.id.toString());
            submitCourseMutation.mutate(formData);
        }
    }

    return (
        <TeacherDashboardLayout
            topbar_title={'اضف كورس جديد'}
            topbar_subtitle="كلها في مكـــــان واحد لك"
            fullScreen
        >
            {isSubmitting && (
                <Stack
                    direction={'row'}
                    gap={2}
                    width={'100%'}
                    alignItems={'center'}
                    sx={{ my: 3 }}
                >
                    <LinearProgress
                        //@ts-expect-error
                        color={'purple'}
                        variant="buffer"
                        value={progress ?? 0}
                        sx={{
                            mx: 2,
                            width: '100%',
                        }}
                    />
                    <Typography>{`${progress.toFixed(0)}%`}</Typography>
                </Stack>
            )}
            <form
                onSubmit={mutate}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <NewCourseCard
                    setHashtags={setHashtags}
                    setLevel={setLevel}
                    setCategory={setCategory}
                    hashtags={hashtags}
                    updateQuizzCallback={updateQuizzCallback}
                    isSubmitting={isSubmitting}
                />
            </form>
        </TeacherDashboardLayout>
    );
}
export default TeacherAddCourse;
