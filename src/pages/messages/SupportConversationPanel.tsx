import { ClearRounded } from '@mui/icons-material';
import {
    Box,
    Card,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import {
    FormEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { Conversation } from '../../types/messages';
import useLogin from '../authenticate/hooks/useLogin';
import { MessageBox } from './MessageBox';
import { SendMessageInput } from './SendMessageInput';
import { createMessage, getConversation, getMessages } from './api/queries';

import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as AttachementImage } from '../../assets/svg/attachement.svg';
import { ReactComponent as ChatWithSupport } from '../../assets/svg/chat-with-support.svg';
import { MainButton } from '../../components/ui/MainButton';
import axiosInstance from '../../globals/axiosInstance';
import { User } from '../../types/user';
import { getCourse } from '../course/api/getCourse';

export async function getDzSkillsUser() {
    const { data } = await axiosInstance.get('/users/admin/');
    return data as User;
}

interface SupportProps {
    selectedConversation: Partial<Conversation>;
    closeConversation: () => void;
    endConversation: () => void;
    startConversation: () => void;
}

function SupportConversationPanel({
                                      selectedConversation,
                                      startConversation,
                                      endConversation,
                                      closeConversation,
                                  }: SupportProps) {
    const theme = useTheme();
    const [user] = useLogin();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
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

    const [recievingUser, setRecievingUser] = useState<User | undefined>(undefined);

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
        [files],
    );

    const removeFile = useCallback(
        (uuid: string) => {
            setFiles(f => {
                return f.filter(file => file.uuid !== uuid);
            });
        },
        [files],
    );

    const queryClient = useQueryClient();
    const conversation = useQuery({
        queryKey: ['conversations', selectedConversation.id, user.data?.pk],
        queryFn: () => getConversation(selectedConversation.id ?? 0),
        onSuccess: () => setIsValid(true),
        onError: (err: AxiosError) => {
            console.error('Some random error ig?', err);
        },
        staleTime: 1000 * 60 * 60,
        enabled: user.isFetched && (selectedConversation.id ?? 0) > 0,
    });

    const messagesQuery = useInfiniteQuery({
        enabled: isValid,
        queryFn: ({ pageParam }) => getMessages(selectedConversation.id, pageParam),
        queryKey: ['conversations', 'messages', selectedConversation.id, user.data?.pk],
        onError: () => setIsValid(false),
        getNextPageParam: (lastPage, pages) => lastPage.next,
        getPreviousPageParam: res => res.previous,
        refetchInterval: 3000,
    });

    const dzSkillsAdminQuery = useQuery({
        queryKey: ['users', 'admin'],
        queryFn: () => getDzSkillsUser(),
        onSuccess: res => setRecievingUser(res),
        enabled: !id,
    });

    useEffect(() => {
        if (!id) setRecievingUser(dzSkillsAdminQuery.data);
    }, [id]);

    const messageMutation = useMutation({
        mutationFn: ({ body }: { body: FormData }) => createMessage(body),
        mutationKey: ['create', 'message', selectedConversation.id, user.data?.pk],
        onSuccess: () => {
            conversation.refetch();
            messagesQuery.refetch();
            queryClient.invalidateQueries({
                queryKey: ['conversations', user.data?.pk],
            });
            if (inputRef.current) inputRef.current.value = '';
        },
    });
    const onSubmit = (
        e:
            | FormEvent<HTMLFormElement>
            | KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        e.preventDefault();
        const form = document.querySelector('form');
        if (form) {
            const formData = new FormData(form);
            //@ts-expect-error
            formData.set('content', inputRef.current?.value);
            formData.set('recipient', selectedConversation.recipient?.toString() ?? '');
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
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <DialogContent>
                    <Stack
                        gap={4}
                        justifyContent={'center'}
                        alignItems={'center'}
                        textAlign={'center'}
                    >
                        <Typography
                            color={'gray.dark'}
                            variant={'h5'}
                        >
                            هل أنت متأكد ؟
                        </Typography>
                        <Typography
                            color={'gray.main'}
                            variant={'h6'}
                        >
                            بإنهاء المحادثة سيتم قطع اتصالك عن عميل الدعم الفني , يمكنك
                            دائما بدأ محادثة جديدة
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Stack
                        direction='row'
                        sx={{
                            gap: 3,
                            width: '100%',
                            placeContent: 'center',
                        }}
                    >
                        <MainButton
                            color={theme.palette.secondary.lighter}
                            text={'نعم'}
                            {...{
                                variant: 'outlined',
                                onClick: () => {
                                    endConversation();
                                    setDialogOpen(false);
                                },
                            }}
                        />
                        <MainButton
                            color={theme.palette.error.main}
                            text={'إلغاء'}
                            {...{
                                variant: 'outlined',
                                onClick: () => setDialogOpen(false),
                            }}
                        />
                    </Stack>
                </DialogActions>
            </Dialog>
            <Card
                elevation={0}
                sx={{
                    flexBasis: { lg: '60%', md: '100%' },
                    bgcolor: 'white',
                    width: '100%',
                    height: { lg: '100%', xs: '100dvh' },
                    pb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // alignContent: 'space-between',
                    // justifyItems: 'space-between',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                        flexGrow: 2,
                        maxHeight: '60dvh',
                        height: '100%',
                    }}
                >
                    <MessageBox
                        messages={messagesQuery.data}
                        hasNextPage={messagesQuery.hasNextPage}
                        loadMore={() => messagesQuery.fetchNextPage()}
                        user={user}
                        teacher_profile_image={recievingUser?.profile_image ?? ''}
                    />
                    {selectedConversation.ticket &&
                        selectedConversation.ticket.state === 'closed' && (
                            <Typography
                                variant={'h6'}
                                color={'gray.main'}
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                انتهت المحادثة
                            </Typography>
                        )}
                </Box>
                {(selectedConversation.id ?? 0) > 0 ? (
                    <Box
                        // height={'100%'}
                        // flexGrow={1}
                        flexShrink={1}
                        pb={2}
                        display={'flex'}
                        alignItems={'center'}
                        flexDirection={'column'}
                        justifyItems={'center'}
                    >
                        <Box
                            px={{
                                xs: 2,
                                lg: 13,
                            }}
                            mx={0}
                            display={'flex'}
                            justifyContent={'center'}
                            width={'100%'}
                        >
                            <form
                                onSubmit={onSubmit}
                                encType='multipart/form-data'
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexGrow: '1',
                                    flexDirection: 'column',
                                    gap: theme.spacing(),
                                }}
                            >
                                <SendMessageInput
                                    enabled={
                                        !selectedConversation.ticket ||
                                        selectedConversation.ticket.state !== 'closed'
                                    }
                                    onSubmit={onSubmit}
                                    inputRef={inputRef}
                                    appendFile={appendFile}
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
                        <Stack
                            direction='row'
                            alignContent={'center'}
                            flexShrink={'1'}
                            flexGrow={'2'}
                            justifyContent='center'
                            gap={2}
                            px={2}
                        >
                            {selectedConversation.ticket &&
                                selectedConversation.ticket.state === 'open' && (
                                    <MainButton
                                        text={'انهاء المحادثة'}
                                        color={theme.palette.error.light}
                                        {...{
                                            variant: 'outlined',
                                            onClick: () => setDialogOpen(true),
                                        }}
                                    />
                                )}
                            <MainButton
                                text={'غلق المحادثة'}
                                color={theme.palette.secondary.lighter}
                                {...{
                                    variant: 'outlined',
                                    onClick: () => closeConversation(),
                                }}
                            />
                        </Stack>
                    </Box>
                ) : (
                    <Stack
                        sx={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '85dvh',
                            placeContent: 'center',
                            alignItems: 'center',
                            gap: 5,
                            textAlign: 'center',
                            px: 3,
                            py: 2,
                        }}
                    >
                        <ChatWithSupport />
                        <Typography
                            variant={'h4'}
                            color={'gray.main'}
                        >
                            إبدأ محادثة مع الدعم
                        </Typography>
                        <Typography
                            variant={'h6'}
                            color={'gray.dark'}
                        >
                            بالضغط على إبدأ سنتأكد من وصلك مع عميل الدعم الفني للتأكد من
                            استلام انشغالكم و الرد عليه
                        </Typography>
                        <MainButton
                            text='ابدأ'
                            color={theme.palette.secondary.lighter}
                            {...{
                                onClick: () => startConversation(),
                            }}
                        />
                    </Stack>
                )}
            </Card>
        </>
    );
}

export default SupportConversationPanel;
