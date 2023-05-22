import { useTheme } from '@mui/material/styles';
import { Video } from '../../types/course';

interface props {
    video: Video | undefined;
    onVideoFinish: any;
}
export function VideoPlayer({
    video,
    onVideoFinish: handleVideoFinish,
}: props) {
    const theme = useTheme();
    return (
        <figure
            style={{
                width: '100%',
                height: 'auto',
            }}
        >
            <video
                onEnded={() => {
                    handleVideoFinish();
                }}
                style={{
                    borderRadius: theme.spacing(2),
                    objectFit: 'cover',
                    maxHeight: '60dvh',
                    width: '100%',
                    backgroundColor: theme.palette.gray.main,
                }}
                controls
                autoPlay={false}
                preload={'auto'}
                width={'100%'}
                src={video?.video}
            ></video>
        </figure>
    );
}
