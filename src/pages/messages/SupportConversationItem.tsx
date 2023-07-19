import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import { Conversation } from '../../types/messages';
import { testLatin } from './ConversationsListPanel';

interface SupportConversationProps {
    conversation: Partial<Conversation>;
    selectedConversation: Partial<Conversation>;
    selectConversation: (e: Partial<Conversation>) => void;
}
function labelFromState(label: string): string {
    if (label === 'open') return 'مفتوح';
    return 'مغلق';
}

export function SupportConversationItem({
    conversation,
    selectedConversation,
    selectConversation,
}: SupportConversationProps) {
    return (
        <Box
            key={conversation.id}
            sx={{
                px: 4,
                py: 3,
                cursor: 'pointer',
            }}
            width={'100%'}
            bgcolor={
                conversation.id === selectedConversation.id ? 'gray.secondary' : 'white'
            }
            onClick={() => selectConversation(conversation)}
        >
            <Stack
                width={'100%'}
                sx={{
                    alignItems: testLatin(conversation.last_message?.content[0] ?? 'ن')
                        ? 'flex-end'
                        : 'flex-start',
                }}
                gap={4}
            >
                <Stack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    direction={'row'}
                    width={'100%'}
                >
                    <Stack
                        direction={'row'}
                        gap={1}
                        alignItems="center"
                    >
                        {conversation.ticket && (
                            <Chip
                                label={labelFromState(conversation.ticket.state)}
                                color={
                                    conversation.ticket.state === 'open'
                                        ? 'warning'
                                        : 'primary'
                                }
                                sx={{
                                    color: 'white',
                                }}
                            />
                        )}
                        <Typography
                            variant="subtitle2"
                            color={'gray.main'}
                        >
                            {conversation.last_message &&
                                new Date(
                                    conversation.last_message.date
                                ).toLocaleString()}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={'row-reverse'}
                        gap={2}
                        alignItems={'center'}
                    >
                        {conversation.course_owner && (
                            <Avatar src={conversation.course_owner.profile_image} />
                        )}
                        <Stack alignItems={'flex-end'}>
                            {conversation.course_title && (
                                <Typography variant="h6">
                                    Course {conversation.course_title}
                                </Typography>
                            )}
                            {conversation.ticket && (
                                <Typography variant="h6">Support</Typography>
                            )}
                            {conversation.course_owner && (
                                <Typography
                                    variant={'body2'}
                                    color={'gray.main'}
                                >
                                    {`${conversation.course_owner.first_name} ${conversation.course_owner.last_name}`}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
                <Typography
                    variant="subtitle2"
                    color={'gray.dark'}
                    sx={{
                        width: '100%',
                        direction: testLatin(conversation.last_message?.content ?? '')
                            ? 'ltr'
                            : 'rtl',
                    }}
                >
                    {conversation.last_message?.content}
                </Typography>
            </Stack>
        </Box>
    );
}
