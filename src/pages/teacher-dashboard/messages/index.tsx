import { Box, Stack, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Conversation } from '../../../types/messages';
import useLogin from '../../authenticate/hooks/useLogin';
import { getAllConversations } from '../../messages/ConversationsListPanel';
import { closeTicket } from '../../messages/api/closeTicket';
import { createTicket } from '../../messages/api/createTicket';
import TeacherDashboardLayout from '../layout';
import TeacherConversationsListPanel from './TeacherConversationListPanel';
import { TeacherMessagesPanel } from './TeacherMessagesPanel';

function TeacherMessages() {
    const theme = useTheme()
    const [user] = useLogin();
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<
        Partial<Conversation>
    >({ id: 0, student: 0 });

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
    const closeConversationMutation = useMutation({
        mutationKey: ['conversation', selectedConversation.id, 'close'],
        mutationFn: (id: number) => closeTicket(id),
        onSuccess: () => {
            enqueueSnackbar('تم إغلاق المحادثة بنجاح', {
                variant: 'success',
                autoHideDuration: 1000 * 3,
            });
            setSelectedConversation({ id: 0 });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
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
        queryFn: () => getAllConversations(),
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

    const closeConversation = useCallback(() => {
        closeConversationMutation.mutate(selectedConversation.ticket?.id ?? 0);
    }, [selectedConversation.id]);

    const startConversation = useCallback(() => {
        createTicketMutation.mutate();
    }, []);

    useEffect(() => console.log(selectedConversation), [selectedConversation?.id]);
    useEffect(
        () => setConversations(conversationListQuery.data ?? []),
        [conversationListQuery.data]
    );

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
                maxHeight={`calc(85dvh - ${theme.spacing(12)})`}
                gap={4}
            >
                <Box sx={{ gridRow: '1 / span 4', gridColumn: '1 / span 2' }}>
                    <TeacherConversationsListPanel
                        conversations={conversations}
                        isLoading={conversationListQuery.isLoading}
                        selectedConversation={selectedConversation}
                        selectConversation={selectConversation}
                    />
                </Box>
                <Box
                    sx={{ gridRow: '1 / span 4', gridColumn: '3 / -1', height: '100%' }}
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
