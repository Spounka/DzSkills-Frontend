import { Skeleton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Image from 'mui-image';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/ui/MainButton';

interface LandingPageSectionProps {
    image: string;
    title: string;
    description: string;
    isLoading: boolean;
}
export function LandingPageSection({
    image,
    title,
    description,
    isLoading,
}: LandingPageSectionProps) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <>
            <Box
                display={'flex'}
                flexDirection={'column'}
                gap={6}
                alignItems={'center'}
                mb={4}
            >
                {isLoading ? (
                    <Skeleton
                        variant="rounded"
                        animation="pulse"
                        sx={{
                            width: '100%',
                            aspectRatio: '1',
                            height: 'auto',
                        }}
                    />
                ) : (
                    <Image
                        fit="contain"
                        src={`https://picsum.photos/300/300/?random=1` || ''}
                        width={'100%'}
                        style={{
                            aspectRatio: '1/1',
                            height: '100%',
                            flex: '1 1 80%',
                        }}
                    />
                )}
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={4}
                    alignItems={'center'}
                    width={'100%'}
                    flex={'1 0 30%'}
                >
                    {isLoading ? (
                        <Skeleton sx={{ width: '100%' }} />
                    ) : (
                        <Typography
                            flex={'0 1 20%'}
                            variant="h6"
                        >
                            {title}
                        </Typography>
                    )}
                    {isLoading ? (
                        <Skeleton sx={{ width: '100%' }} />
                    ) : (
                        <Typography
                            flex={'1 1 20%'}
                            variant="subtitle2"
                            color="gray.main"
                            textAlign={'center'}
                            sx={{
                                verticalAlign: 'baseline',
                            }}
                        >
                            {description}
                        </Typography>
                    )}
                </Box>
                <MainButton
                    color={theme.palette.primary.main}
                    text={'المزيد'}
                    {...{
                        onClick: () => {
                            navigate(`/courses/categorized/?category=${title}`);
                        },
                        flexGrow: '4',
                    }}
                />
            </Box>
        </>
    );
}
