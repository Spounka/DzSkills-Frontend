import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { Conversation } from '../../../types/messages';
import { testLatin } from '../../messages/ConversationsListPanel';

interface TeacherConversationProps {
    conversation: Partial<Conversation>;
    selectedConversation: Partial<Conversation>;
    selectConversation: (e: Partial<Conversation>) => void;
}
export function TeacherConversationItem({
    conversation,
    selectedConversation,
    selectConversation,
}: TeacherConversationProps) {
    const theme = useTheme();
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
                    overflowX: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'fade(10px)',
                }}
                gap={4}
            >
                <Stack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    direction={'row'}
                    width={'100%'}
                >
                    <Typography
                        variant="subtitle2"
                        color={'gray.main'}
                        display={{
                            xs: 'none',
                            lg: 'block',
                        }}
                    >
                        {conversation.last_message &&
                            new Date(
                                conversation.last_message.date
                            ).toLocaleDateString()}
                    </Typography>
                    <Stack
                        direction={'row-reverse'}
                        gap={2}
                        alignItems={'center'}
                    >
                        <Avatar src={conversation.student_data?.profile_image ?? ''} />
                        <Stack
                            alignItems={'flex-end'}
                            textAlign={'left'}
                        >
                            {conversation.course_title && (
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: theme.typography.body1,
                                            xl: theme.typography.h6,
                                        },
                                    }}
                                >
                                    Course {conversation.course_title}
                                </Typography>
                            )}
                            {conversation.ticket && (
                                <Typography
                                    sx={{
                                        fontSize: {
                                            xs: theme.typography.body1,
                                            xl: theme.typography.h6,
                                        },
                                    }}
                                >
                                    Support
                                </Typography>
                            )}
                            {conversation.student_data && (
                                <Typography
                                    variant={'body2'}
                                    color={'gray.main'}
                                >
                                    {`${conversation.student_data.first_name} ${conversation.student_data.last_name}`}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
                <Typography
                    variant="subtitle2"
                    color={'gray.dark'}
                    sx={{
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
