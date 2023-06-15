import { Send } from '@mui/icons-material';
import { Card, IconButton, OutlinedInput, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { AxiosError } from 'axios';
import { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as AttachementImage } from '../../assets/svg/attachement.svg';
import { Course } from '../../types/course';
import { User } from '../../types/user';
import { MessageBox } from './MessageBox';
import { createMessage, getConversation, getMessages } from './api/queries';

interface props {
    id: number;
    user: UseQueryResult<User, unknown>;
    course: UseQueryResult<Course, unknown>;
}
export function ConversationPanel({ user, course, id }: props) {
    const inputRef = useRef(null);
    const [isValid, setIsValid] = useState(false);

    const conversation = useQuery({
        queryKey: ['conversations', id, user.data?.pk, course.data?.id],
        queryFn: () => getConversation(id),
        enabled: user.isFetched && course.isFetched,
        onSuccess: () => setIsValid(true),
        onError: (err: AxiosError) => {
            // if (err.response?.status === 403) navigate(`/courses/${id}/buy/`);
            // else console.error(err);
            console.error(err);
        },
    });

    const messagesQuery = useQuery({
        enabled: isValid,
        queryFn: () => getMessages(conversation.data?.id),
        queryKey: ['conversations', 'messages', id, user.data?.pk, course.data?.id],
        onError: () => setIsValid(false),
        refetchInterval: 5000,
    });

    const messageMutation = useMutation({
        mutationFn: ({ body }: { body: FormData }) => createMessage(body),
        mutationKey: ['create', 'message', id, user.data?.pk, course.data?.id],
        onSuccess: () => conversation.refetch(),
    });

    const onSubmit = (
        e:
            | FormEvent<HTMLFormElement>
            | KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        e.preventDefault();
        const form = document.querySelector('form');
        if (form) {
            const formData = new FormData(form);
            formData.set('recipient', course.data?.owner.pk.toString() || '');
            formData.set('course', id.toString());
            messageMutation.mutate({ body: formData });
            //@ts-expect-error
            inputRef.current.value = '';
        }
    };

    if (conversation.isLoading) return <>Loading conversation...</>;

    return (
        <Card
            elevation={0}
            sx={{
                flexBasis: '60%',
                bgcolor: 'white',
                width: '100%',
                pb: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                maxHeight: '100%',
            }}
        >
            <MessageBox
                messages={messagesQuery.data?.results}
                user={user}
                course={course}
            />
            <Box
                px={13}
                mx={0}
                display={'flex'}
                justifyContent={'center'}
                width={'100%'}
            >
                <form
                    onSubmit={onSubmit}
                    style={{ width: '100%' }}
                >
                    <OutlinedInput
                        multiline
                        onKeyDown={event => {
                            if (event.shiftKey && event.key === 'Enter') {
                                event.preventDefault();
                                onSubmit(event);
                            }
                        }}
                        color={'secondary'}
                        inputRef={inputRef}
                        name="content"
                        sx={{
                            px: 2,
                            width: '100%',
                            flexGrow: '1',
                        }}
                        startAdornment={
                            <Stack
                                direction={'row'}
                                gap={2}
                            >
                                <IconButton
                                    color="secondary"
                                    type="submit"
                                >
                                    <Send fill={'blue'} />
                                </IconButton>
                                <IconButton>
                                    <AttachementImage />
                                </IconButton>
                            </Stack>
                        }
                    />
                </form>
            </Box>
        </Card>
    );
}
