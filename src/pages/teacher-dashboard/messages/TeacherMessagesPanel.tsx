import { ClearRounded } from '@mui/icons-material';
import { Box, Card, Chip, CircularProgress, Stack, useTheme } from '@mui/material';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { FormEvent, KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as AttachementImage } from '../../../assets/svg/attachement.svg';
import { Conversation } from '../../../types/messages';
import { getCourse } from '../../course/api/getCourse';
import { MessageBox } from '../../messages/MessageBox';
import { SendMessageInput } from '../../messages/SendMessageInput';
import { createMessage, getConversation, getMessages } from '../../messages/api/queries';
import useReduxData from '../../../stores/reduxUser';

interface MessagesPanelProps {
    selectedConversation: Partial<Conversation>;
    startConversation?: () => void;
}
export function TeacherMessagesPanel({
    selectedConversation,
}: MessagesPanelProps) {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useReduxData().user.user;

    const inputRef = useRef<HTMLInputElement>(null);
    const [isValid, setIsValid] = useState(false);
    const [files, setFiles] = useState<{ file: File; uuid?: string }[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const id = useMemo(
        () => selectedConversation.course ?? 0,
        [selectedConversation.course]
    );

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

    const courseQuery = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
        enabled: id > 0,
    });

    const conversation = useQuery({
        queryKey: ['conversations', id, user?.pk],
        queryFn: () => getConversation(id, true),
        onSuccess: () => setIsValid(true),
        onError: (err: AxiosError) => {
            if (err.response?.status === 403) navigate(`/courses/${id}/buy/`);
            else console.error('Some random error ig?', err);
        },
        staleTime: 1000 * 60 * 5,
        enabled: user?.pk > 0 && id > 0,
    });

    const messagesQuery = useInfiniteQuery({
        enabled: isValid,
        queryKey: ['conversations', 'messages', id, user?.pk],
        queryFn: ({ pageParam }) => getMessages(conversation.data?.id, pageParam),
        onError: () => setIsValid(false),
        getNextPageParam: (lastPage, _) => lastPage.next,
        getPreviousPageParam: res => res.previous,
        refetchInterval: 3000,
    });

    const client = useQueryClient();
    const messageMutation = useMutation({
        mutationFn: ({ body }: { body: FormData }) => createMessage(body),
        mutationKey: ['create', 'message', id, user?.pk, courseQuery.data?.id],
        onSuccess: () => {
            client.invalidateQueries(['conversations', 'messages', id, user?.pk]);
            client.invalidateQueries(['conversations', id, user?.pk]);
            client.invalidateQueries(['conversations', user?.pk]);
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
            formData.set('course', id.toString());
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

    if (conversation.isLoading)
        return (
            <Card
                elevation={0}
                sx={{
                    flexBasis: '60%',
                    bgcolor: 'white',
                    width: '100%',
                    height: '100%',
                    maxHeight: '75dvh',
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
        <Card
            elevation={0}
            sx={{
                flexBasis: '60%',
                bgcolor: 'white',
                width: '100%',
                // height: 'min-content',
                maxHeight: '75dvh',
                height: '100%',
                pb: 2,
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: 4,
            }}
        >
            <Box
                px={13}
                mx={0}
                display={'flex'}
                justifyContent={'center'}
                width={'100%'}
                flexGrow={0}
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
                        enabled
                        onSubmit={onSubmit}
                        inputRef={inputRef}
                        appendFile={appendFile}
                    />

                    <Stack
                        direction={'row'}
                        width={'100%'}
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
                                    deleteIcon={<ClearRounded fill={'red'} />}
                                    onDelete={() => removeFile(f.uuid ?? '')}
                                />
                            );
                        })}
                    </Stack>
                </form>
            </Box>

            <MessageBox
                messages={messagesQuery.data}
                hasNextPage={messagesQuery.hasNextPage}
                loadMore={() => messagesQuery.fetchNextPage()}
                teacher_profile_image={courseQuery.data?.owner.profile_image ?? ''}
            />
        </Card>
    );
}
