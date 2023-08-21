import React, { RefObject } from 'react';
import { UseQueryResult } from 'react-query';
import Stack from '@mui/material/Stack';
import { DropdownPopper } from '../dropdown-popper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { MarkChatRead } from '@mui/icons-material';
import { NotificationElement } from './NotificationElement';
import { Notification } from '../../types/notifications';

interface NotificationsMenuProps {
    isActive: boolean;
    notificationsQuery: UseQueryResult<Notification[], unknown>;
    menuRef: RefObject<HTMLElement>;
    onClickAway: (b: boolean) => void;
    handleMarkAsReadClick: () => void;
}

export function NotificationsMenu({
    isActive: notificationsActive,
    onClickAway: setNotificationsActive,
    handleMarkAsReadClick,
    menuRef,
    notificationsQuery,
}: NotificationsMenuProps) {
    return (
        <>
            <DropdownPopper
                clickAway={() => setNotificationsActive(false)}
                isOpen={notificationsActive}
                cardRef={menuRef}
                placement="bottom-end"
            >
                <Stack
                    gap={2}
                    sx={{
                        direction: 'rtl',
                        pl: 2,
                    }}
                >
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        gap={2}
                        width={'100%'}
                    >
                        <Typography>الإشعارات</Typography>
                        <Tooltip title={'اعتبر مقروء'}>
                            <IconButton
                                color={'primary'}
                                onClick={handleMarkAsReadClick}
                                disabled={
                                    !notificationsQuery.data?.some(n => !n.is_read)
                                }
                                sx={{
                                    px: 0,
                                }}
                            >
                                <MarkChatRead />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Stack
                        direction={'column-reverse'}
                        gap={1}
                    >
                        {notificationsQuery.data?.length === 0 ? (
                            <Typography>لا يوجد أي إشعارات</Typography>
                        ) : (
                            notificationsQuery.data?.slice(-5).map(n => {
                                return (
                                    <React.Fragment key={n.id}>
                                        <NotificationElement notification={n} />
                                    </React.Fragment>
                                );
                            })
                        )}
                    </Stack>
                </Stack>
            </DropdownPopper>
        </>
    );
}
