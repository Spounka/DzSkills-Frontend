import { useTheme } from '@mui/material/styles';
import { Video } from '../../types/course';
import useLogin from '../authenticate/hooks/useLogin';

interface props {
    video: Video | undefined;
    onVideoFinish: any;
}

export function VideoPlayer({ video, onVideoFinish: handleVideoFinish }: props) {
    const theme = useTheme();
    const user = useLogin();
    return (
        <figure
            onContextMenu={e => e.preventDefault()}
            style={{
                width: '100%',
                height: 'auto',
                position: 'relative',
            }}
        >
            <video
                onEnded={handleVideoFinish}
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
            <span
                style={{
                    position: 'absolute',
                    left: '1%',
                    top: '1%',
                    color: 'white',
                    opacity: '0.5',
                    pointerEvents: 'none',
                    fontWeight: '500',
                }}
            >
                {user?.pk}
            </span>
        </figure>
    );
}
