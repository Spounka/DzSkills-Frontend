import { Box, Grid, Slider, Stack, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import TopNavigationBar from '../../components/top-bar';
import { MainButton } from '../../components/ui/MainButton';
import theme from '../../theme';
import { QuizzAnswer } from './QuizzAnswer';
import { getQuizz } from './getQuizz';

function CourseQuizz() {
    const params = useParams();

    if (!params?.id) return <Typography>Error</Typography>;
    // @ts-ignore
    if (isNaN(params.id)) return <NotFound />;

    const id: number = parseInt(params.id);
    const quizzQuery = useQuery({
        queryFn: () => getQuizz(id),
        queryKey: ['courses', id, 'quizz'],
    });
    const navigate = useNavigate();

    return (
        <Grid
            container
            columns={14}
            direction="column"
            spacing={5}
            id={'main-grid-container'}
            sx={{
                backgroundColor: 'white',
                maxWidth: '100%',
                minHeight: '100vh',
            }}
        >
            <Grid
                item
                xs={14}
                sx={{
                    width: '100%',
                }}
                style={{
                    paddingLeft: '0',
                    paddingRight: '0',
                }}
            >
                <TopNavigationBar />
            </Grid>

            <Grid
                xs={13}
                item
                container
                style={{
                    padding: 0,
                }}
                sx={{
                    backgroundColor: 'gray.secondary',
                    py: `${theme.spacing(8)} !important`,
                    px: `${theme.spacing(16)} !important`,
                    height: '100%',
                    minHeight: '100vh',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                    gap: theme.spacing(4),
                }}
            >
                <Box
                    sx={{
                        gridRow: '1',
                        height: 'auto',
                        flexShrink: '1',
                        gridColumn: '1 / -1',
                    }}
                >
                    <Typography
                        color={'primary.main'}
                        variant={'body2'}
                    >
                        تم إتمام 100% من الكورس
                    </Typography>
                    <Slider
                        size={'medium'}
                        value={100}
                        onChange={() => {}}
                        sx={{
                            // scale: '-1 1',
                            height: 6,
                            mb: 1,
                            '.MuiSlider-thumb': {
                                display: 'none',
                            },
                            '&.Mui-disabled': {
                                color: `${theme.palette.primary.main} !important`,
                            },
                            '& .MuiSlider-rail': {
                                bgcolor: theme.palette.gray.dark,
                            },
                        }}
                        disabled
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: '1',
                        gridRow: '2 / -1 ',
                        gridColumn: '1 / -1',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        gap: 8,
                    }}
                >
                    <Stack gap={2}>
                        <Typography variant={'h5'}>
                            يرجى إكمال الكويز لاستلام شهادتك
                        </Typography>
                        <Typography
                            variant={'body1'}
                            color={'gray.main'}
                        >
                            هذا الكويز يهدف لاختبار معارفك و مكتسباتك من الدورة
                        </Typography>
                    </Stack>

                    {quizzQuery.data?.questions?.map((q, i) => {
                        return (
                            <Stack
                                gap={4}
                                width={'100%'}
                                alignItems={'center'}
                            >
                                <Typography variant="h6">
                                    {`${i + 1} - ${q.content}`}
                                </Typography>
                                <Grid
                                    container
                                    columns={2}
                                    spacing={2}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                >
                                    {q.choices?.map(c => {
                                        return (
                                            <Grid
                                                item
                                                xs={1}
                                                key={c.key}
                                                width={'100%'}
                                                flex={'1 1 50%'}
                                            >
                                                <QuizzAnswer choice={c} />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Stack>
                        );
                    })}
                    <MainButton
                        color={theme.palette.primary.main}
                        text={'تأكيد الأجوبة'}
                        onClick={() => navigate(`/courses/${id}/certificate/`)}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default CourseQuizz;
