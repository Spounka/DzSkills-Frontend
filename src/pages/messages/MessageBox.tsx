import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { InfiniteData, UseQueryResult, useQuery } from 'react-query';
import { MainButton } from '../../components/ui/MainButton';
import { MessagePagination } from '../../types/messages';
import { User } from '../../types/user';
import { Message } from './Message';
import { getDzSkillsUser } from './SupportConversationPanel';
import useLogin from '../authenticate/hooks/useLogin';

interface MessageBoxProps {
    messages?: InfiniteData<MessagePagination>;
    user: UseQueryResult<User, unknown>;
    teacher_profile_image: string;
    hasNextPage?: boolean;
    loadMore?: any;
}
export function MessageBox({
    messages,
    // user,
    teacher_profile_image,
    hasNextPage,
    loadMore,
}: MessageBoxProps) {
    const theme = useTheme();
    const [user] = useLogin();

    const dzSkillsAdminQuery = useQuery({
        queryKey: ['users', 'admin'],
        queryFn: () => getDzSkillsUser(),
    });
    if (!messages?.pages?.length) return <></>;
    return (
        <Box
            sx={{
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                // height: '100%',
                flexGrow: 1,
                py: 2,
                // pt: 3,
                // px: 2,
                display: 'flex',
                gap: 0,
                flexDirection: 'column-reverse',
            }}
        >
            {messages?.pages?.map((page, i) => {
                return (
                    <React.Fragment key={i}>
                        {page.results?.map((message, index, arr) => {
                            let isSender = false;

                            let avatarSrc = undefined;
                            isSender = message.sender === user.data?.pk;
                            if (
                                user.data?.groups.some(g => g.name === 'AdminGroup') &&
                                message.sender === dzSkillsAdminQuery.data?.pk
                            ) {
                                isSender = true;
                                avatarSrc = dzSkillsAdminQuery.data?.profile_image;
                            } else {
                                avatarSrc = isSender
                                    ? user.data?.profile_image
                                    : teacher_profile_image;
                            }
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
                    </React.Fragment>
                );
            })}
            {hasNextPage && (
                <MainButton
                    color={theme.palette.secondary.lighter}
                    text="تحميل المزيد"
                    {...{
                        sx: {
                            my: 2,
                        },
                        onClick: loadMore,
                    }}
                />
            )}
        </Box>
    );
}
