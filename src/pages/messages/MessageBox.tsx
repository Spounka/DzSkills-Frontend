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
    course: UseQueryResult<Course, unknown>;
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
                gap: 4,
                flexDirection: 'column-reverse',
                maxHeight: '100%',
            }}
        >
            {messages?.map((message, index) => {
                const avatarSrc =
                    message.sender === user.data?.pk
                        ? user.data?.profile_image
                        : course.data?.owner.profile_image;
                const isSender = message.sender === user.data?.pk;
                const dir = isSender ? 'flex-end' : 'flex-start';
                return (
                    <Message
                        key={message.id}
                        dir={dir}
                        message={message}
                        avatarSrc={avatarSrc}
                        isSender={isSender}
                    />
                );
            })}
        </Box>
    );
}
