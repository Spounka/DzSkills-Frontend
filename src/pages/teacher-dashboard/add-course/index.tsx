import { useTheme } from '@mui/system';
import { useState } from 'react';
import { useMutation } from 'react-query';
import useLogin from '../../authenticate/hooks/useLogin';
import TeacherDashboardLayout from '../layout';
import { submitCourse } from './api/submitCourse';
import { NewCourseCard } from './components/new-course-card/NewCourseCard';

export function TeacherAddCourse() {
    useLogin();

    const query = useMutation({
        mutationFn: (p: any) => submitCourse(p),
        mutationKey: ['course-submit'],
    });

    async function mutate(e: any) {
        e.preventDefault();
        const form = document.querySelector('form');
        if (form) {
            let formData = new FormData(form);
            query.mutate(formData);
        }
    }

    return (
        <TeacherDashboardLayout
            topbar_title={'اضف كورس جديد'}
            topbar_subtitle="كلها في مكـــــان واحد لك"
        >
            <form
                onSubmit={mutate}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <NewCourseCard />
            </form>
        </TeacherDashboardLayout>
    );
}
export default TeacherAddCourse;
