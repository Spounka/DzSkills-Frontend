import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { User } from '../../types/user';
import { getCourse } from '../course/api/getCourse';
import { CourseConversationPanel } from './CourseConversationPanel';
import { TeacherDetailsPanel } from './TeacherDetailsPanel';

interface ContactTeacherContentProps {
    user: UseQueryResult<User, unknown>;
}
export function ContactContent({ user }: ContactTeacherContentProps) {
    const params = useParams();
    let id = 0;
    if (params.id && !Number.isNaN(id)) {
        id = parseInt(params.id);
    }

    const theme = useTheme();
    const [infoPanelOpen, setInfoPanelOpen] = useState(false);

    const closePanel = () => setInfoPanelOpen(false);
    const courseQuery = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
        enabled: id > 0,
    });

    return (
        <Box
            sx={{
                px: theme.spacing(26),
                width: '100%',
                maxHeight: `calc(100% - ${theme.spacing(20)} - 2rem)`,
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 2,
            }}
        >
            {courseQuery.data ? (
                <>
                    <CourseConversationPanel
                        id={id}
                        user={user}
                        course={courseQuery.data}
                    />
                    <TeacherDetailsPanel teacher={courseQuery.data?.owner} />
                </>
            ) : (
                <></>
            )}
        </Box>
    );
}
