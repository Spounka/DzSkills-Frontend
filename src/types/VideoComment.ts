import { Video } from './course';
import { User } from './user';

export type VideoComment = {
    id: number;
    content: string;
    commentor: User;
    video: Video;
};

export default VideoComment;
