import Box from '@mui/material/Box';
import { useEffect, useRef } from 'react';
import { UseQueryResult } from 'react-query';
import { Course } from '../../types/course';
import { UserMessage } from '../../types/messages';
import { User } from '../../types/user';
import { Message } from './Message';

interface MessageBoxProps {
    messages?: UserMessage[];
    user: UseQueryResult<User, unknown>;
    course: Course
}
export function MessageBox({ messages, user, course }: MessageBoxProps) {
    const boxRef = useRef(null);
    useEffect(() => {
        if (boxRef.current) {
            //@ts-expect-error
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <Box
            ref={boxRef}
            sx={{
                overflowY: messages ? 'scroll' : 'hidden',
                scrollbarWidth: 'thin',
                flexGrow: '1',
                py: 2,
                px: 2,
                display: 'flex',
                gap: 0,
                flexDirection: 'column-reverse',
            }}
        >
            {messages?.map((message, index, arr) => {
                const avatarSrc =
                    message.sender === user.data?.pk
                        ? user.data?.profile_image
                        : course.owner.profile_image;
                const isSender = message.sender === user.data?.pk;
                const dir = isSender ? 'flex-end' : 'flex-start';
                let useAvatar = true;

                const prevMessage = index > 0 && arr[index - 1];
                if (prevMessage && prevMessage.sender === message.sender)
                    useAvatar = false;
                return (
                    <Message
                        key={message.id}
                        dir={dir}
                        message={message}
                        avatarSrc={(useAvatar && avatarSrc) || ''}
                        isSender={isSender}
                    />
                );
            })}
        </Box>
    );
}
