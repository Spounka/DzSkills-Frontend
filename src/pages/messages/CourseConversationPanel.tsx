import { ClearRounded, Send } from '@mui/icons-material';
import {
    Card,
    Chip,
    CircularProgress,
    IconButton,
    OutlinedInput,
    Stack,
    useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { FormEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';
import { UseQueryResult, useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as AttachementImage } from '../../assets/svg/attachement.svg';
import { Course } from '../../types/course';
import { User } from '../../types/user';
import { MessageBox } from './MessageBox';
import { createMessage, getConversation, getMessages } from './api/queries';

interface props {
    id: number;
    user: UseQueryResult<User, unknown>;
    course: Course;
}

function testLatin(text: string) {
    if (/"^[\u0600-\u06FF]"/.test(text[0])) return false;
    else return true;
}

export function CourseConversationPanel({ user, course, id }: props) {
    const theme = useTheme();
    const navigate = useNavigate();

    const inputRef = useRef(null);
    const [isValid, setIsValid] = useState(false);
    const [files, setFiles] = useState<{ file: File; uuid?: string }[]>([]);
    const { enqueueSnackbar } = useSnackbar();

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

    const conversation = useQuery({
        queryKey: ['conversations', id, user.data?.pk],
        queryFn: () => getConversation(id),
        enabled: user.isFetched,
        onSuccess: () => setIsValid(true),
        onError: (err: AxiosError) => {
            if (err.response?.status === 403) navigate(`/courses/${id}/buy/`);
            else console.error(err);
        },
        staleTime: 1000 * 60 * 60,
    });

    const messagesQuery = useQuery({
        enabled: isValid,
        queryFn: () => getMessages(conversation.data?.id),
        queryKey: ['conversations', 'messages', id, user.data?.pk, course.id],
        onError: () => setIsValid(false),
        refetchInterval: 3000,
    });

    const messageMutation = useMutation({
        mutationFn: ({ body }: { body: FormData }) => createMessage(body),
        mutationKey: ['create', 'message', id, user.data?.pk, course.id],
        onSuccess: () => {
            conversation.refetch();
            messagesQuery.refetch();
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
            formData.set('recipient', course.owner.pk.toString() ?? '');
            formData.set('course', id.toString());
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    formData.append(`files[${i}]`, files[i].file);
                }
            }
            messageMutation.mutate({ body: formData });
            //@ts-expect-error
            inputRef.current.value = '';
            clearFiles();
        }
    };

    if (conversation.isLoading) return <CircularProgress />;

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
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing(),
                    }}
                >
                    <OutlinedInput
                        multiline
                        maxRows={5}
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
                            direction: 'rtl',
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
                                <MessageAddFile appendFile={appendFile} />
                            </Stack>
                        }
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
        </Card>
    );
}

interface addFileProps {
    appendFile: (f: { file: File; uuid?: string }) => void;
}
function MessageAddFile({ appendFile }: addFileProps) {
    return (
        <IconButton component={'label'}>
            <input
                style={{
                    width: 1,
                    height: 1,
                }}
                type="file"
                multiple
                accept=".pdf,image/*,.xlsl,xls,doc,.docx"
                onChange={e => {
                    let fs = e.currentTarget.files;
                    if (fs) {
                        for (const element of fs) {
                            appendFile({ file: element, uuid: uuidv4() });
                            e.currentTarget.files = null;
                        }
                    }
                }}
            />
            <AttachementImage stroke={'black'} />
        </IconButton>
    );
}
