import { Divider } from '@mui/material';
import { Course } from '../../types/course';
import { CourseCellDetails } from './CourseCellDetails';

interface CourseCellsProps {
    data?: Course;
}
export function CourseCells({ data }: CourseCellsProps) {

    function getCourseLanguage(language: string) {
        switch (language.toLowerCase()) {
            case 'arabic':
                return 'العربية';
            case 'french':
                return 'الفرنسية';
            case 'english':
                return 'الإنجليزية';
            default:
                return 'مجهول';
        }
    }
    return (
        <>
            <CourseCellDetails
                title={'المستوى'}
                text={data?.course_level?.name ?? 'مبتدئ'}
            />
            <Divider
                orientation="vertical"
                flexItem
            />

            <CourseCellDetails
                title={'الدروس'}
                text={data?.videos_count.toString() ?? ''}
            />

            <Divider
                orientation="vertical"
                flexItem
            />

            <CourseCellDetails
                title={'المدة'}
                text={data?.duration ?? ''}
            />

            <Divider
                orientation="vertical"
                flexItem
            />

            <CourseCellDetails
                title={'البرامج المستعملة'}
                text={data?.used_programs ?? ""}
            />

            <Divider
                orientation="vertical"
                flexItem
            />

            <CourseCellDetails
                title={'اللغة'}
                text={getCourseLanguage(data?.language ?? '')}
            />
        </>
    );
}
