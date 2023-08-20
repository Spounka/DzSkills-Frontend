import { Slider, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Image from 'mui-image';
import { useQuery } from 'react-query';
import Footer from '../../components/footer';
import TopNavigationBar from '../../components/top-bar';
import { MainButton } from '../../components/ui/MainButton';
import useLogin from '../authenticate/hooks/useLogin';
import { useIsBanned } from '../banned-page/BannedPage';
import { getStudentProgress } from '../view-course/api/queries';
import { getCertificate } from './api/query';
import { useRouteID } from '../../globals/hooks';

function ViewCertificate() {
    const id: number = useRouteID();
    const theme = useTheme();
    const [userQuery] = useLogin();
    const user = userQuery.data;

    const progression = useQuery({
        queryKey: ['progression', id, user?.pk],
        queryFn: () => getStudentProgress(id),
        staleTime: 1000 * 60 * 2,
        enabled: !!user,
    });

    const certificate = useQuery({
        queryKey: ['certificate', id, user?.pk],
        queryFn: () => getCertificate(id),
        staleTime: 1000 * 60 * 2,
    });
    const { banned, BannedPageComponent } = useIsBanned();
    if (banned) return <BannedPageComponent />;

    if (!progression.data) return <>Error in data</>;
    if (progression.isLoading) return <Typography>Loading...</Typography>;
    if (progression.isError) return <>Error in data</>;

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
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                    gap: theme.spacing(4),
                }}
            >
                <Box
                    sx={{
                        gridRow: '1',
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
                        value={progression.data?.percentage}
                        aria-readonly
                        sx={{
                            scale: '-1 1',
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
                        flexGrow: '1',
                        gridRow: '2 ',
                        height: '100%',
                        gridColumn: '1 / -1',
                        alignContent: 'center',
                        justifyItems: 'center',
                        gap: 3,
                    }}
                >
                    <Stack
                        textAlign={'center'}
                        flexBasis={'50%'}
                        width={'100%'}
                        flexGrow={1}
                        gap={2}
                        justifyContent={'center'}
                    >
                        <Typography
                            color={'secondary.light'}
                            variant={'h4'}
                            fontWeight={600}
                        >
                            100/100
                        </Typography>
                        <Typography variant={'h6'}>
                            ألف مبروك, لقد أتممت الدورة بنجاح
                        </Typography>
                        <Typography
                            variant="caption"
                            color={'gray.main'}
                        >
                            نبارك لك اكمالك للدورة بنجاح, يمكنك تحميل شهادتك و استغلال
                            المعارف التي اكتسبتها في بناء مستقبلك المهني, نتمنى لك كل
                            التوفيق
                        </Typography>

                        <MainButton
                            text={'تحميل'}
                            color={theme.palette.primary.main}
                            {...{
                                download: true,
                                component: 'a',
                                href: certificate.data?.certificate_image ?? '',
                            }}
                        />
                    </Stack>
                    <Image
                        style={{
                            flexShrink: 1,
                            width: '100%',
                            maxWidth: '70%',
                            flexBasis: '50%',
                            // maxHeight: '50%',
                        }}
                        src={certificate.data?.certificate_image ?? ''}
                    />
                </Box>
            </Grid>
            <Footer />
        </Grid>
    );
}

export default ViewCertificate;
