import { CircularProgress, Stack } from '@mui/material';
import { StyledCard } from '../../components/StyledCard';
import axiosInstance from '../../globals/axiosInstance';
import { Conversation } from '../../types/messages';
import { SupportConversationItem } from './SupportConversationItem';

export async function getAllConversations() {
    const { data } = await axiosInstance.get('/conversations/');
    return data as Conversation[];
}

export function testLatin(text: string) {
    if (/"^[\u0600-\u06FF]"/.test(text[0])) return false;
    else return true;
}

interface ConversationListProps {
    conversations: Conversation[];
    isLoading: boolean;
    selectedConversation: Partial<Conversation>;
    selectConversation: (convo: Partial<Conversation>) => void;
}
function ConversationsListPanel({
    conversations,
    isLoading,
    selectedConversation,
    selectConversation,
}: ConversationListProps) {
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
                        <SupportConversationItem
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

export default ConversationsListPanel;
