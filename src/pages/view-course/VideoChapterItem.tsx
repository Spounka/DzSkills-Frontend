import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/system/Container';
import Image from 'mui-image';
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
                // bgcolor: getVideoBg(),
                gap: 4,
                opacity: locked ? '.4' : 1,
            }}
        >
            <Image
                src={video.thumbnail ?? ''}
                errorIcon={false}
                style={{
                    flex: '1 1 30%',
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                }}
            />
            <Box
                flex={'1 0 60%'}
                width={'100%'}
            >
                <Typography color={locked ? 'white' : 'gray.dark'}>
                    {video.title}
                </Typography>
                <Typography
                    variant={'subtitle2'}
                    fontWeight={300}
                    color={locked ? 'white' : 'gray.dark'}
                >
                    {video.duration}
                </Typography>
            </Box>
        </Container>
    );
}
