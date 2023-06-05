import { Avatar, Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserMessage } from '../../types/messages';

interface MessageProps {
    message: UserMessage;
    avatarSrc?: string;
    dir: string;
    isSender: boolean;
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
                alignItems: 'center',
            }}
        >
            <Avatar
                src={avatarSrc}
                sx={{
                    alignSelf: 'flex-start',
                    flexBasis: '10%',
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1',
                }}
            />
            <Box
                sx={{
                    flexBasis: '80%',
                    flexShrink: '1',
                    flexGrow: '1',
                    width: '100%',
                    color: isSender ? 'black' : 'white',
                }}
            >
                <Box
                    sx={{
                        px: 3,
                        py: 2,
                        borderRadius: theme.spacing(),
                        borderTopRightRadius: isSender ? '0' : theme.spacing(),
                        borderTopLefttRadius: isSender ? theme.spacing() : '0',
                        bgcolor: !isSender ? 'secondary.lighter' : 'gray.secondary',
                        width: 'fit-content',
                    }}
                >
                    <Typography
                        variant={'inherit'}
                        sx={{
                            fontWeight: 400,
                            width: '100%',
                        }}
                    >
                        {message.content}
                    </Typography>
                </Box>
            </Box>
            <Box
                flexBasis={'10%'}
                width={'100%'}
            ></Box>
        </Stack>
    );
}
