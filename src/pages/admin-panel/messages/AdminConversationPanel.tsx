import { ClearRounded } from '@mui/icons-material';
import { Box, Card, Chip, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { FormEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as AttachementImage } from '../../../assets/svg/attachement.svg';
import { ReactComponent as ChatWithSupport } from '../../../assets/svg/chat-with-support.svg';
import { Conversation } from '../../../types/messages';
import useLogin from '../../authenticate/hooks/useLogin';
import { getCourse } from '../../course/api/getCourse';
import { MessageBox } from '../../messages/MessageBox';
import { SendMessageInput } from '../../messages/SendMessageInput';
import { getDzSkillsUser } from '../../messages/SupportConversationPanel';
import { createMessage, getConversation, getMessages } from '../../messages/api/queries';

interface ConversationPanelProps {
    selectedConversation: Partial<Conversation>;
}

export function AdminConversationPanel({
    selectedConversation,
}: ConversationPanelProps) {
    const theme = useTheme();
    const user = useLogin();

    const inputRef = useRef<HTMLInputElement>(null);
    const [isValid, setIsValid] = useState(false);
    const [files, setFiles] = useState<{ file: File; uuid?: string }[]>([]);
    const { enqueueSnackbar } = useSnackbar();

    // this is here so that I can use it
    // for both Course and Ticket ID, since this panel
    // display conversations for both
    const id = useMemo(() => {
        if (selectedConversation.course) return selectedConversation.course;
        return 0;
    }, [selectedConversation.id]);

    const courseQuery = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id ?? -1),
        enabled: Boolean(id),
    });

    useEffect(() => {
        (async () => await courseQuery.refetch())();
    }, [id]);

    const clearFiles = useCallback(() => {
        setFiles([]);
    }, [files]);

    const appendFile = useCallback(
        (file: { file: File; uuid?: string }) => {
            if (file.file.size <= 1024 * 1024 * 5) setFiles(f => [...f, { ...file }]);
            else
                enqueueSnackbar('لا يمكنك تحميل ملف أكبر من 5 ميغا بايت', {
                    variant: 'error',
                    autoHideDuration: 2500,
                });
        },
        [files]
    );

    const removeFile = useCallback(
        (uuid: string) => {
            setFiles(f => {
                return f.filter(file => file.uuid !== uuid);
            });
        },
        [files]
    );

    const queryClient = useQueryClient();
    const conversation = useQuery({
        queryKey: ['conversations', selectedConversation.id, user?.pk],
        queryFn: () => getConversation(selectedConversation.id ?? 0),
        onSuccess: () => setIsValid(true),
        onError: (err: AxiosError) => {
            console.error('Some random error ig?', err);
        },
        staleTime: 1000 * 60 * 60,
        enabled: Boolean(user) && (selectedConversation.id ?? 0) > 0,
    });

    const messagesQuery = useInfiniteQuery({
        queryKey: ['conversations', 'messages', 'infinite', selectedConversation.id],
        queryFn: ({ pageParam }) => getMessages(selectedConversation.id, pageParam),
        getNextPageParam: (lastPage, _) => lastPage.next,
        getPreviousPageParam: res => res.previous,
        enabled: isValid,
        refetchInterval: 3000,
    });

    useQuery({
        queryKey: ['users', 'admin'],
        queryFn: () => getDzSkillsUser(),
        enabled: !id,
    });

    const messageMutation = useMutation({
        mutationFn: ({ body }: { body: FormData }) => createMessage(body),
        mutationKey: ['create', 'message', selectedConversation.id, user?.pk],
        onSuccess: async () => {
            await conversation.refetch();
            await messagesQuery.refetch();
            await queryClient.invalidateQueries({
                queryKey: ['conversations', user?.pk],
            });
            await queryClient.invalidateQueries({
                queryKey: [
                    'conversations',
                    'messages',
                    'infinite',
                    selectedConversation.id,
                ],
            });
            if (inputRef.current) inputRef.current.value = '';
        },
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
            //@ts-expect-error
            formData.set('content', inputRef.current?.value);
            formData.set('recipient', selectedConversation.student?.toString() ?? '');
            if (selectedConversation.course)
                formData.set('course', selectedConversation.course.toString());
            if (selectedConversation.ticket)
                formData.set('ticket', selectedConversation.ticket.id.toString());
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    formData.append(`files[${i}]`, files[i].file);
                }
            }
            messageMutation.mutate({ body: formData });
            if (inputRef.current) inputRef.current.value = '';
            clearFiles();
        }
    };

    useEffect(() => {
        return () => {
            if (inputRef.current) inputRef.current.value = '';
            clearFiles();
        };
    }, [selectedConversation.id]);

    const loadMore = () => messagesQuery.fetchNextPage();

    if (conversation.isLoading)
        return (
            <Card
                elevation={0}
                sx={{
                    flexBasis: '60%',
                    bgcolor: 'white',
                    width: '100%',
                    height: '100%',
                    pb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
                <CircularProgress color={'secondary'} />
            </Card>
        );

    return (
        <>
            <Card
                elevation={0}
                sx={{
                    flexBasis: { lg: '60%', md: '100%' },
                    bgcolor: 'white',
                    width: '100%',
                    height: '100%',
                    pb: 4,
                    pt: 2,
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    gap: 4,
                }}
            >
                {(selectedConversation.id ?? 0) > 0 ||
                (selectedConversation.ticket &&
                    selectedConversation.ticket.state !== 'closed') ? (
                    <Box
                        flexShrink={'1'}
                        display={
                            selectedConversation.ticket &&
                            selectedConversation.ticket.state === 'closed'
                                ? 'none'
                                : 'flex'
                        }
                    >
                        <Box
                            px={13}
                            mx={0}
                            justifyContent={'center'}
                            width={'100%'}
                        >
                            <form
                                onSubmit={onSubmit}
                                encType="multipart/form-data"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: theme.spacing(),
                                }}
                            >
                                <SendMessageInput
                                    onSubmit={onSubmit}
                                    inputRef={inputRef}
                                    appendFile={appendFile}
                                    enabled={
                                        selectedConversation.ticket?.state !== 'closed'
                                    }
                                />
                                <Stack
                                    direction={'row'}
                                    width={'100%'}
                                    maxHeight={'5dvh'}
                                    overflow={'auto'}
                                    justifyContent={'flex-end'}
                                    px={4}
                                    gap={1}
                                    sx={{
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {files.map(f => {
                                        return (
                                            <Chip
                                                sx={{
                                                    direction: 'ltr',
                                                    p: 2,
                                                    flexBasis: '25%',
                                                }}
                                                key={uuidv4()}
                                                avatar={<AttachementImage />}
                                                label={`${f.file.name.substring(0, 15)}`}
                                                deleteIcon={
                                                    <ClearRounded fill={'red'} />
                                                }
                                                onDelete={() => removeFile(f.uuid ?? '')}
                                            />
                                        );
                                    })}
                                </Stack>
                            </form>
                        </Box>
                    </Box>
                ) : (
                    <Stack
                        sx={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            // justifyItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            px: 3,
                            py: 2,
                            gap: 8,
                        }}
                    >
                        <ChatWithSupport />
                        <Typography
                            variant={'h4'}
                            color={'gray.main'}
                        >
                            اضغط على محادثة
                        </Typography>
                    </Stack>
                )}

                {selectedConversation.ticket &&
                    selectedConversation.ticket.state === 'closed' && (
                        <Typography
                            variant={'h6'}
                            color={'gray.main'}
                            mb={2}
                            sx={{
                                textAlign: 'center',
                                verticalAlign: 'bottom',
                            }}
                        >
                            تم اغلاق المحادثة
                        </Typography>
                    )}

                <MessageBox
                    messages={messagesQuery.data}
                    hasNextPage={messagesQuery.hasNextPage}
                    loadMore={loadMore}
                    teacher_profile_image={
                        selectedConversation.student_data?.profile_image ?? ''
                    }
                />
            </Card>
        </>
    );
}
