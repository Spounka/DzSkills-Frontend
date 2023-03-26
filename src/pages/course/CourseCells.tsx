import { Divider } from '@mui/material';
import { CourseCellDetails } from './CourseCellDetails';

interface CourseCellsProps {
    data: any;
}
export function CourseCells({ data }: CourseCellsProps) {
    function getCourseLevel(level: string) {
        if (level === 'beg')
            return 'مبتدئ';
        if (level === 'interm')
            return 'متقدم';
        return 'احترافي';
    }

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
            <CourseCellDetails title={'المستوى'} text={getCourseLevel(data.course_level)} />
            <Divider orientation='vertical' flexItem />

            <CourseCellDetails title={'الدروس'} text={data.videos_count} />

            <Divider orientation='vertical' flexItem />

            <CourseCellDetails title={'المدة'} text={data.duration} />

            <Divider orientation='vertical' flexItem />

            <CourseCellDetails title={'البرامج المستعملة'} text={data.used_programs} />

            <Divider orientation='vertical' flexItem />

            <CourseCellDetails title={'اللغة'} text={getCourseLanguage((data.language))} />
        </>
    );
}
