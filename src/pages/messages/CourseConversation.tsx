import { User } from '../../types/user';
import { CourseConversationPanel } from './CourseConversationPanel';
import { TeacherDetailsPanel } from './TeacherDetailsPanel';

interface CourseConversationProps {
    id: number;
    user: User;
}
export function CourseConversation({ id, user }: CourseConversationProps) {
    return (
        <>
            <CourseConversationPanel
                id={id}
                user={user}
            />
            <TeacherDetailsPanel />
        </>
    );
}
