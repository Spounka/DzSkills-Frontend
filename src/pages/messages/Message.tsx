import { Avatar, IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactComponent as AttachementImage } from '../../assets/svg/attachement.svg';
import { UserMessage } from '../../types/messages';

interface MessageProps {
    message: UserMessage;
    avatarSrc?: string;
    dir: string;
    isSender: boolean;
}

function testLatin(text: string) {
    if (/"^[\u0600-\u06FF]"/.test(text[0])) return false;
    else return true;
}

export function Message({ message, avatarSrc, dir, isSender }: MessageProps) {
    const theme = useTheme();

    return (
        <Stack
            direction={isSender ? 'row' : 'row-reverse'}
            key={message.id}
            sx={{
                px: 2,
                gap: 2,
                alignSelf: dir,
                alignItems: 'flex-end',
                width: '100%',
                mb: avatarSrc ? 2 : 1,
            }}
        >
            {avatarSrc ? (
                <Avatar
                    src={avatarSrc}
                    sx={{
                        alignSelf: 'flex-end',
                        flexShrink: 1,
                        flexBasis: '3%',
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1',
                        mt: -3,
                    }}
                />
            ) : (
                <Box
                    sx={{
                        alignSelf: 'center',
                        flexShrink: 1,
                        flexBasis: '3%',
                        width: '100%',
                        height: 'auto',
                    }}
                ></Box>
            )}
            <Box
                sx={{
                    flexBasis: '80%',
                    flexShrink: '1',
                    flexGrow: '1',
                    color: isSender ? 'black' : 'white',
                    display: 'flex',
                    justifyContent: isSender ? 'flex-end' : 'flex-start',
                    direction: testLatin(message.content) ? 'ltr' : 'rtl',
                }}
            >
                <Tooltip
                    title={new Date(message.date).toLocaleString()}
                    followCursor
                    sx={{
                        direction: 'ltr',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            px: 3,
                            py: 2,
                            borderRadius: theme.spacing(),
                            borderTopRightRadius: isSender ? '0' : theme.spacing(),
                            borderTopLefttRadius: isSender ? theme.spacing() : '0',
                            bgcolor: !isSender ? 'secondary.lighter' : 'gray.secondary',
                            placeSelf: isSender ? 'flex-end' : 'flex-start',
                            my: isSender ? 'auto 0' : '0 auto',
                            overflowWrap: 'break-word',
                            maxWidth: '25vw',
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            gap: 1,
                        }}
                    >
                        <Typography
                            variant={'inherit'}
                            sx={{
                                fontWeight: 400,
                            }}
                        >
                            {message.content}
                        </Typography>
                        {message.files.length > 0 && (
                            <form
                                method="get"
                                action={`${import.meta.env.VITE_HOST}/conversations/${
                                    message.id
                                }/files/`}
                                style={{
                                    justifySelf: 'start',
                                    padding: 0,
                                }}
                            >
                                <Tooltip
                                    title={'اضغط لتحميل الملفات'}
                                    arrow
                                    followCursor
                                >
                                    <IconButton
                                        disableFocusRipple
                                        disableRipple
                                        type="submit"
                                        sx={{ width: '100%' }}
                                    >
                                        <Box
                                            display={'flex'}
                                            gap={1}
                                            sx={{
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}
                                        >
                                            <Typography
                                                color={
                                                    isSender ? 'gray.darker' : 'white'
                                                }
                                            >
                                                {message.files.length}
                                            </Typography>
                                            <AttachementImage
                                                fill={'none'}
                                                stroke={isSender ? 'black' : 'white'}
                                            />
                                        </Box>
                                    </IconButton>
                                </Tooltip>
                            </form>
                        )}
                    </Box>
                </Tooltip>
            </Box>
            <Box
                flexBasis={'10%'}
                width={'100%'}
                flexGrow={1}
                flexShrink={0}
            ></Box>
        </Stack>
    );
}
