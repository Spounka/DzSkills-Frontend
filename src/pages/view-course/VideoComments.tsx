import { Send } from '@mui/icons-material';
import {
    Divider,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Pagination,
    Stack,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { VideoComment as Comment } from '../../types/VideoComment';
import { VideoComment } from './VideoComment';
import { getVideoComments, submitComment } from './api/queries';

interface VideoCommentsProps {
    videoID: number;
}
export function VideoComments({ videoID }: VideoCommentsProps) {
    const [page, setPage] = useState<number>(1);
    const [pageSize, _] = useState(8);
    const inputRef = useRef(null);
    const videoCommentsQuery = useQuery({
        queryKey: ['video', 'comments', videoID],
        queryFn: () => getVideoComments(videoID),
    });

    const videoCommentMutation = useMutation({
        mutationKey: ['video', 'comments', 'create'],
        mutationFn: ({ content, id }: any) => submitComment(content, id),
        onSuccess: () => {
            //@ts-expect-error
            inputRef.current.value = '';
            videoCommentsQuery.refetch();
        },
    });
    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const commentsWithUUID = videoCommentsQuery.data?.map((comment: Comment) => {
        return { ...comment, key: uuidv4() };
    });

    const getPaginatedData = (allData: (Comment & { key: string })[] | undefined) => {
        if (!allData) return [];
        const it = (page - 1) * pageSize;
        return allData.slice(it, it + pageSize);
    };

    return (
        <Stack
            gap={4}
            sx={{ direction: 'rtl' }}
            mt={4}
        >
            <form
                onSubmit={(e: React.FormEvent<HTMLFormElement> | undefined) => {
                    e?.preventDefault();
                    const data = {
                        //@ts-expect-error
                        content: inputRef.current.value,
                        id: videoID,
                    };
                    videoCommentMutation.mutate(data);
                }}
            >
                <OutlinedInput
                    color="secondary"
                    id={`outlined-adornment-password-${uuidv4()}`}
                    placeholder={''}
                    type={'text'}
                    inputRef={inputRef}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                type="submit"
                                aria-label="send message"
                                edge="end"
                            >
                                <Send />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </form>
            <Divider />

            {getPaginatedData(commentsWithUUID).map(comment => {
                return (
                    <VideoComment
                        key={comment.key}
                        comment={comment}
                        isLoading={videoCommentsQuery.isLoading}
                    />
                );
            })}

            <Pagination
                sx={{
                    width: '100%',
                    mx: 'auto',
                }}
                count={
                    (videoCommentsQuery.data &&
                        Math.round(videoCommentsQuery.data?.length / pageSize)) ||
                    0
                }
                onChange={handlePageChange}
            />
        </Stack>
    );
}
