import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Conversation, Ticket } from '../../types/messages';
import useLogin from '../authenticate/hooks/useLogin';
import ConversationsListPanel, { getAllConversations } from './ConversationsListPanel';
import SupportConversationPanel from './SupportConversationPanel';
import { closeTicket } from './api/closeTicket';
import { createTicket } from './api/createTicket';

export function SupportPanels() {
    const [user] = useLogin();
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<
        Partial<Conversation>
    >({ id: 0, student: 0 });
    const [newTicket, setNewTicket] = useState<Ticket>();

    const createTicketMutation = useMutation({
        mutationKey: ['conversation', 'create'],
        mutationFn: () => createTicket(),
        onSuccess: res => {
            enqueueSnackbar('تم إنشاء المحادثة بنجاح', {
                variant: 'success',
                autoHideDuration: 1000 * 3,
            });
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            if (typeof res.converesation !== 'number') {
                setNewTicket(res);
            }
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
            queryClient.invalidateQueries({
                queryKey: ['conversations', user.data?.pk],
            });
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
        // onSuccess: res => setConversations(res),
        onError: () => {
            enqueueSnackbar('فشل تحميل المحادثات', {
                variant: 'error',
                autoHideDuration: 1000 * 3,
            });
        },
    });
    const selectConversation = useCallback(
        (conversation: Partial<Conversation>) => setSelectedConversation(conversation),
        [selectedConversation.id]
    );

    const endConversation = useCallback(() => {
        closeConversationMutation.mutate(selectedConversation.ticket?.id ?? 0);
    }, [selectedConversation.id]);

    const closeConversation = useCallback(() => {
        setSelectedConversation({ id: 0 });
    }, []);

    const startConversation = useCallback(() => {
        createTicketMutation.mutate();
        queryClient.invalidateQueries({ queryKey: ['conversations', user.data?.pk] });
    }, [selectedConversation.id]);

    useEffect(
        () => setConversations(conversationListQuery.data ?? []),
        [conversationListQuery.data]
    );

    useEffect(() => {
        if (newTicket?.converesation && typeof newTicket.converesation !== 'number')
            setSelectedConversation(newTicket.converesation);
    }, [newTicket?.converesation]);

    return (
        <>
            <SupportConversationPanel
                selectedConversation={selectedConversation}
                startConversation={startConversation}
                closeConversation={closeConversation}
                endConversation={endConversation}
            />
            <ConversationsListPanel
                conversations={conversations}
                isLoading={conversationListQuery.isLoading}
                selectedConversation={selectedConversation}
                selectConversation={selectConversation}
            />
        </>
    );
}
