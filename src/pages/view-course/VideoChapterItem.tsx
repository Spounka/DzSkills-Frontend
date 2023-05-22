import { PlayCircle } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/system/Container';
import { Video } from '../../types/course';

interface props {
    locked: boolean;
    video: Video;
    setCurrentVideo: any;
    activeVideo: Video | undefined;
}

export function VideoChapterItem({
    locked,
    video,
    setCurrentVideo,
    activeVideo,
}: props) {
    const theme = useTheme();
    function getVideoBg() {
        if (locked) {
            return theme.palette.gray.dark;
        }
        if (video === activeVideo) {
            return theme.palette.primary.main;
        }
        return 'white';
    }
    return (
        <Container
            onClick={() => {
                !locked && setCurrentVideo(video);
            }}
            sx={{
                cursor: locked ? 'default' : 'pointer',
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: getVideoBg(),
            }}
        >
            <Box>
                <Typography>{video.title}</Typography>
                <Typography
                    variant={'subtitle2'}
                    fontWeight={300}
                    color={'gray.dark'}
                >
                    {video.duration}
                </Typography>
            </Box>
            <PlayCircle
                sx={{
                    color: 'gray.main',
                    width: '32px',
                    height: 'auto',
                }}
            />
        </Container>
    );
}
