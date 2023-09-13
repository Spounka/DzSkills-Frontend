import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Conversation, Ticket } from '../../types/messages';
import ConversationsListPanel, { getAllConversations } from './ConversationsListPanel';
import SupportConversationPanel from './SupportConversationPanel';
import { closeTicket } from './api/closeTicket';
import { createTicket } from './api/createTicket';
import useReduxData from '../../stores/reduxUser';

export function SupportPanels() {
    const user = useReduxData().user.user;
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useQueryClient();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<
        Partial<Conversation>
    >({ id: 0, student: 0 });
    const [newTicket, setNewTicket] = useState<Partial<Ticket> | undefined>({ id: 0 });

    const createTicketMutation = useMutation({
        mutationKey: ['conversation', 'create', 'ticket'],
        mutationFn: () => createTicket(),
        onSuccess: async res => {
            enqueueSnackbar('تم إنشاء المحادثة بنجاح', {
                variant: 'success',
                autoHideDuration: 1000 * 3,
            });
            await queryClient.invalidateQueries({
                queryKey: ['conversations', user?.pk],
            });
            if (typeof res.converesation !== 'number') {
                setNewTicket(res);
            } else {
                enqueueSnackbar('حدث خطأ ما من فضلك حاول مرة أخرى', {
                    variant: 'error',
                    autoHideDuration: 1000 * 3,
                });
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
        onSuccess: async () => {
            enqueueSnackbar('تم إغلاق المحادثة بنجاح', {
                variant: 'success',
                autoHideDuration: 1000 * 3,
            });
            setSelectedConversation({ id: 0 });
            await queryClient.invalidateQueries({
                queryKey: ['conversations', user?.pk],
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
        queryKey: ['conversations', user?.pk],
        queryFn: () => getAllConversations(),
        onSuccess: res => setConversations(res),
        onError: () => {
            enqueueSnackbar('فشل تحميل المحادثات', {
                variant: 'error',
                autoHideDuration: 1000 * 3,
            });
        },
        enabled: (user?.pk ?? 0) > 0,
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

    const startConversation = useCallback(async () => {
        createTicketMutation.mutate();
        await queryClient.invalidateQueries({ queryKey: ['conversations', user?.pk] });
    }, [selectedConversation.id]);

    useEffect(
        () => setConversations(conversationListQuery.data ?? []),
        [conversationListQuery.data]
    );

    useEffect(() => {
        if (newTicket?.converesation && typeof newTicket.converesation !== 'number') {
            setSelectedConversation(newTicket.converesation);
            setNewTicket(undefined);
        }
    }, [newTicket?.id]);

    return (
        <>
            <SupportConversationPanel
                selectedConversation={selectedConversation}
                startConversation={startConversation}
                closeConversation={closeConversation}
                endConversation={endConversation}
            />
            <ConversationsListPanel
                conversations={conversations?.sort(c =>
                    c.ticket && c.ticket.state === 'closed' ? 1 : 0
                )}
                isLoading={conversationListQuery.isLoading}
                selectedConversation={selectedConversation}
                selectConversation={selectConversation}
            />
        </>
    );
}
