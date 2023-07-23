import { Box, CircularProgress, Stack, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { StyledCard } from '../../../components/StyledCard';
import { Conversation } from '../../../types/messages';
import useLogin from '../../authenticate/hooks/useLogin';
import { getAllConversations } from '../../messages/ConversationsListPanel';
import AdminDashboardLayout from '../layout';
import { AdminConversationItem } from './AdminConversationItem';
import { AdminConversationPanel } from './AdminConversationPanel';

export function AdminMessages() {
    const [user] = useLogin();
    const { enqueueSnackbar } = useSnackbar();

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<
        Partial<Conversation>
    >({ id: 0, student: 0 });

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
        [selectedConversation.id]
    );

    useEffect(
        () => setConversations(conversationListQuery.data ?? []),
        [conversationListQuery.data]
    );

    const theme = useTheme();

    return (
        <AdminDashboardLayout
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
                        {conversationListQuery.isFetching && (
                            //@ts-expect-error
                            <CircularProgress color={'purple'} />
                        )}
                        <Stack
                            width={'100%'}
                            sx={{
                                px: 0,
                            }}
                            height={'100%'}
                        >
                            {conversations.map(conversation => {
                                return (
                                    <AdminConversationItem
                                        key={conversation.id}
                                        conversation={conversation}
                                        selectedConversation={selectedConversation}
                                        selectConversation={selectConversation}
                                    />
                                );
                            })}
                        </Stack>
                    </StyledCard>
                </Box>
                <Box
                    sx={{
                        gridRow: '1 / span 4',
                        gridColumn: '3 / -1',
                        height: '100%',
                    }}
                >
                    <AdminConversationPanel
                        selectedConversation={selectedConversation}
                    />
                </Box>
            </Box>
        </AdminDashboardLayout>
    );
}
