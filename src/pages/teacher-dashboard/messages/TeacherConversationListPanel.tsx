import { CircularProgress, Stack } from '@mui/material';
import { StyledCard } from '../../../components/StyledCard';
import { Conversation } from '../../../types/messages';
import { TeacherConversationItem } from './TeacherConversationItem';

interface TeacherConversationListProps {
    conversations: Conversation[];
    isLoading: boolean;
    selectedConversation: Partial<Conversation>;
    selectConversation: (convo: Partial<Conversation>) => void;
}

export default function TeacherConversationsListPanel({
    conversations,
    isLoading,
    selectedConversation,
    selectConversation,
}: TeacherConversationListProps) {
    return (
        <StyledCard
            sx={{
                display: {
                    xs: 'none',
                    lg: 'flex',
                },
                flexBasis: '40%',
                bgcolor: 'white',
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0,
                pt: 4,
                scrollbarWidth: 'thin',
            }}
        >
            {
                //@ts-expect-error
                isLoading && <CircularProgress color={'purple'} />
            }
            <Stack
                width={'100%'}
                sx={{
                    px: 0,
                }}
                height={'100%'}
            >
                {conversations.map(conversation => {
                    return (
                        <TeacherConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            selectedConversation={selectedConversation}
                            selectConversation={selectConversation}
                        />
                    );
                })}
            </Stack>
        </StyledCard>
    );
}
