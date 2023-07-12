import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { CourseQuizz } from '../../../types/quizz';
import useLogin from '../../authenticate/hooks/useLogin';
import TeacherDashboardLayout from '../layout';
import { submitCourse } from './api/submitCourse';
import { NewCourseCard } from './components/new-course-card/NewCourseCard';
import { useSnackbar } from 'notistack';

export function TeacherAddCourse() {
    useLogin();
    const [quizz, setQuizz] = React.useState<CourseQuizz>();
    const updateQuizz = (q: CourseQuizz) => {
        setQuizz(q);
    };

    const updateQuizzCallback = useCallback(updateQuizz, [quizz]);
    const navigate = useNavigate();
    const x = useSnackbar();

    const query = useMutation({
        mutationFn: (p: any) => submitCourse(p),
        mutationKey: ['course-submit'],
        onSuccess: () => {
            x.enqueueSnackbar('تم تحميل الدورة بنجاح', {
                variant: 'success',
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
            });
            setTimeout(() => {
                navigate('/dashboard/teacher/courses/');
            }, 1000);
        },
        onError: () => {
            x.enqueueSnackbar('حدث خطأ', {
                variant: 'error',
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
            });
        },
    });

    async function mutate(e: any) {
        e.preventDefault();
        const form = document.querySelector('form');
        if (form) {
            let formData = new FormData(form);
            formData.append('quizz', JSON.stringify(quizz));
            query.mutate(formData);
        }
    }

    return (
        <TeacherDashboardLayout
            topbar_title={'اضف كورس جديد'}
            topbar_subtitle="كلها في مكـــــان واحد لك"
            fullScreen
        >
            <form
                onSubmit={mutate}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <NewCourseCard
                    quizz={quizz}
                    updateQuizzCallback={updateQuizzCallback}
                />
            </form>
        </TeacherDashboardLayout>
    );
}
export default TeacherAddCourse;
