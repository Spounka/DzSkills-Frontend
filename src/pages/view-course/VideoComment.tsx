import { Avatar, Divider, Skeleton, Stack, Typography } from '@mui/material';
import VideoComment from '../../types/VideoComment';

export function VideoComment({
    comment,
    isLoading,
}: {
    comment: VideoComment;
    isLoading: boolean;
}) {

    return (
        <Stack
            direction="row"
            gap={4}
            width={'100%'}
            alignItems={'center'}
        >
            {isLoading ? (
                <Skeleton variant={'circular'} />
            ) : (
                <Avatar src={comment.commentor.profile_image} />
            )}
            <Stack
                width={'100%'}
                gap={1}
            >
                <Typography variant={'body2'}>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        `${comment.commentor.first_name} ${comment.commentor.last_name}`
                    )}
                </Typography>
                <Typography variant="inherit">
                    {isLoading ? <Skeleton /> : comment.content}
                </Typography>

                <Divider />
            </Stack>
        </Stack>
    );
}
