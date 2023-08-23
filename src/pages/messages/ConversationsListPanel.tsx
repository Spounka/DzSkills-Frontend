import { Menu } from '@mui/icons-material';
import { CircularProgress, IconButton, Stack, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import { StyledCard } from '../../components/StyledCard';
import axiosInstance from '../../globals/axiosInstance';
import { Conversation } from '../../types/messages';
import { SupportConversationItem } from './SupportConversationItem';

export async function getAllConversations() {
    const { data } = await axiosInstance.get('/conversations/');
    return data as Conversation[];
}

export function testLatin(text: string) {
    return !/"[\u0600-\u06FF]"/.test(text[0]);
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
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const selectConversationAndCloseDrawer = (c: Partial<Conversation>) => {
        setDrawerOpen(false);
        selectConversation(c);
    };
    return (
        <>
            <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                    display: { lg: 'none', xs: 'block' },
                    position: 'absolute',
                    top: '10%',
                }}
            >
                <Menu />
            </IconButton>
            <SwipeableDrawer
                anchor={'left'}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onOpen={() => setDrawerOpen(true)}
                disableSwipeToOpen={false}
                swipeAreaWidth={56}
                ModalProps={{
                    keepMounted: true,
                }}
                disableBackdropTransition
                sx={{
                    zIndex: 10,
                    // height: '100%',
                    // overflowY: 'scroll',
                    // width: '100dvw',
                    display: {
                        lg: 'none',
                        xs: 'block',
                    },
                }}
            >
                <StyledCard
                    sx={{
                        display: 'flex',
                        flexBasis: { xs: '100%', lg: '40%' },
                        bgcolor: 'white',
                        // width: '100vw',
                        // height: '100%',
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
                                    selectConversation={selectConversationAndCloseDrawer}
                                />
                            );
                        })}
                    </Stack>
                </StyledCard>
            </SwipeableDrawer>
            <StyledCard
                sx={{
                    display: { xs: 'none', lg: 'flex' },
                    flexBasis: { xs: '100%', lg: '40%' },
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
                                selectConversation={selectConversationAndCloseDrawer}
                            />
                        );
                    })}
                </Stack>
            </StyledCard>
        </>
    );
}

export default ConversationsListPanel;
