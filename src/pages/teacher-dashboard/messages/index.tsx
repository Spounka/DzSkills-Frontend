import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Conversation } from '../../../types/messages';
import useLogin from '../../authenticate/hooks/useLogin';
import { createTicket } from '../../messages/api/createTicket';
import TeacherDashboardLayout from '../layout';
import TeacherConversationsListPanel from './TeacherConversationListPanel';
import { TeacherMessagesPanel } from './TeacherMessagesPanel';
import axiosInstance from '../../../globals/axiosInstance';


export async function getTeacherOnlyConversations() {
    const { data } = await axiosInstance.get('/conversations/teacher/');
    return data as Conversation[];
}

interface TeacherMessagesProps {
    id?: number;
}
function TeacherMessages({ id }: TeacherMessagesProps) {
    const [user] = useLogin();
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<
        Partial<Conversation>
    >({ id: id ?? 0 });

    const createTicketMutation = useMutation({
        mutationKey: ['conversation', 'create'],
        mutationFn: () => createTicket(),
        onSuccess: res => {
            enqueueSnackbar('تم إنشاء المحادثة بنجاح', {
                variant: 'success',
                autoHideDuration: 1000 * 3,
            });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            setSelectedConversation(
                conversations.filter(c => c.id === res.converesation)[0] ?? { id: 0 }
            );
        },
        onError: () => {
            enqueueSnackbar('حدث خطأ ما من فضلك حاول مرة أخرى', {
                variant: 'error',
                autoHideDuration: 1000 * 3,
            });
        },
    });

    const conversationListQuery = useQuery({
        queryKey: ['conversations', user.data?.pk],
        queryFn: () => getTeacherOnlyConversations(),
        onSuccess: res => setConversations(res),
        onError: () => {
            enqueueSnackbar('فشل تحميل المحادثات', {
                variant: 'error',
                autoHideDuration: 1000 * 3,
            });
        },
    });

    const selectConversation = useCallback(
        (conversation: Partial<Conversation>) => setSelectedConversation(conversation),
        [selectedConversation]
    );

    const startConversation = useCallback(() => {
        createTicketMutation.mutate();
    }, []);

    useEffect(() => {
        setConversations(conversationListQuery.data ?? []);
        if (id) {
            setSelectedConversation(conversations.filter(c => c.id === id)[0]);
        }
    }, [conversationListQuery.data]);

    return (
        <TeacherDashboardLayout
            fullScreen
            topbar_title={'الرسائل'}
            topbar_subtitle="كلها في مكـــــان واحد لك"
        >
            <Box
                display={'grid'}
                gridTemplateColumns={'repeat(5, minmax(0, 1fr))'}
                gridTemplateRows={'repeat(4, minmax(0, 1fr))'}
                width={'100%'}
                // maxHeight={`calc(85dvh - ${theme.spacing(12)})`}
                height={'75dvh'}
                gap={4}
            >
                <Box
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        gridRow: '1 / span 4',
                        gridColumn: {
                            xs: 'none',
                            md: '1 / span 2',
                        },
                    }}
                >
                    <TeacherConversationsListPanel
                        conversations={conversations}
                        isLoading={conversationListQuery.isLoading}
                        selectedConversation={selectedConversation}
                        selectConversation={selectConversation}
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        gridRow: '1 / span 4',
                        gridColumn: {
                            xs: '1 / -1',
                            lg: '3 / -1',
                        },
                        height: '100%',
                    }}
                >
                    <TeacherMessagesPanel
                        selectedConversation={selectedConversation}
                        startConversation={startConversation}
                    />
                </Box>
            </Box>
        </TeacherDashboardLayout>
    );
}

export default TeacherMessages;
