import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { UseQueryResult, useQuery } from 'react-query';
import { User } from '../../types/user';
import { getCourse } from '../course/api/getCourse';
import { ConversationPanel } from './ConversationPanel';
import { TeacherDetailsPanel } from './TeacherDetailsPanel';
import useIsNotSelf from './hooks/useNotSelf';

interface ContactTeacherContentProps {
    id: number;
    user: UseQueryResult<User, unknown>;
}
export function ContactTeacherContent({ id, user }: ContactTeacherContentProps) {
    const theme = useTheme();

    const course = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
    });

    useIsNotSelf(course.data?.owner, `/courses/${id}/watch`);
    return (
        <Box
            sx={{
                px: theme.spacing(26),
                width: '100%',
                maxHeight: '90vh',
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 2,
            }}
        >
            <ConversationPanel
                id={id}
                user={user}
                course={course}
            />
            <TeacherDetailsPanel course={course} />
        </Box>
    );
}
