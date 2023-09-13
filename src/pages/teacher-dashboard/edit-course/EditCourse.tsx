import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AxiosProgressEvent } from "axios";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { StyledCard } from "../../../components/StyledCard";
import axiosInstance from "../../../globals/axiosInstance";
import { useRouteID } from "../../../globals/hooks";
import { Category, Course, EditRequest, Hashtag, Level } from "../../../types/course";
import { CourseQuizz } from "../../../types/quizz";
import useLogin from "../../authenticate/hooks/useLogin";
import { getCourse } from "../../course/api/getCourse";
import { submitCourse, updateCourse } from "../add-course/api/submitCourse";
import { NewCourseCard } from "../add-course/components/new-course-card/NewCourseCard";
import TeacherDashboardLayout from "../layout";

interface props {
    course: Course
}
export function EditCourse() {
    const id = useRouteID()
    const courseQuery = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id)
    })

    if (!courseQuery.data) return <></>
    return <EditCourseContent course={courseQuery.data} />

}

function EditCourseContent({ course }: props) {
    useLogin();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [quizz, setQuizz] = useState<CourseQuizz>(course.quizz);
    const updateQuizz = (q: CourseQuizz) => {
        setQuizz(q);
    };

    const [hashtags, setHashtags] = useState<Hashtag[]>(course.hashtags);
    const [category, setCategory] = useState<
        Partial<Category> & { name: string; id: number }
    >(course.category);
    const [level, setLevel] = useState<
        Partial<Level> & { name: string; id: number }
    >(course.course_level);

    const updateQuizzCallback = useCallback(updateQuizz, [quizz]);
    const navigate = useNavigate();
    const x = useSnackbar();
    const uploadProgress = (e: AxiosProgressEvent) => {
        setProgress((e.loaded / (e.total ?? 1)) * 100);
    };

    const submitCourseMutation = useMutation({
        mutationFn: (p: any) => updateCourse(course.id, p, uploadProgress),
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

    const editRequestQuery = useQuery({
        queryKey: ['courses', course.id, 'edit'],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/courses/${course.id}/edits/`)
            return data as EditRequest
        }
    })

    async function mutate(e: any) {
        window.scrollTo({ top: 0 });
        setIsSubmitting(true);
        e.preventDefault();
        const form = document.querySelector('form');
        if (form) {
            const formData = new FormData(form);
            for (let _field of e.currentTarget) {
                const field = _field as HTMLInputElement;
                if (field.value) formData.set(field.name, field.value);
            }
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
            topbar_title={'تعديل الدورة'}
            topbar_subtitle="كلها في مكـــــان واحد لك"
            fullScreen
        >
            {isSubmitting ? (
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
            ) : (
                <StyledCard
                    sx={{
                        my: 3,
                    }}>
                    <Typography variant={'h6'}>
                        رسالة التعديل
                    </Typography>
                    <Typography>
                        {editRequestQuery.data?.reason}
                    </Typography>
                </StyledCard>
            )}
            <form
                onSubmit={mutate}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <NewCourseCard
                    course={course}
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
