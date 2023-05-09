import { Avatar, Button, Divider, Slider, Tab, Tabs } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import TopNavigationBar from '../../components/top-bar'
import { MainButton } from '../../components/ui/MainButton'
import { selectUser } from '../../redux/userSlice'
import { Chapter, Video } from '../../types/course'
import useLogin from '../authenticate/hooks/useLogin'
import { getCourse } from '../course/api/getCourse'
import NotFound from '../not-found/NotFound'
import { ChapterAccordion } from './ChapterAccordion'
import { VideoPlayer } from './VideoPlayer'
import { getStudentProgress, updateStudentProgress } from './api/student-progress'

function WatchCourse() {
    const params = useParams()
    const user = useSelector(selectUser)

    if (!params || !params.id)
        return <Typography>Error</Typography>

    // @ts-ignore
    if (isNaN(params.id))
        return <NotFound />

    const id: number = parseInt(params.id)
    const theme = useTheme()
    const token = localStorage.getItem('access_token')
    useLogin()

    const query = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,

    })


    const client = useQueryClient()
    const mutation = useMutation({
        mutationFn: () => updateStudentProgress(id, token),
        mutationKey: ['progression', id, user.user.pk, 'submit'],
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: ['progression', id, user.user.pk]
            })
        }
    })

    const progression = useQuery({
        queryKey: ['progression', id, user.user.pk],
        queryFn: () => getStudentProgress(id, token),
        onSuccess: (data) => setCurrentVideo(query.data?.chapters[data?.last_chapter_index || 0].videos[data?.last_video_index || 0]),
        staleTime: 1000 * 60 * 2,

    })

    const [currentVideo, setCurrentVideo] = useState<Video>(
        query.data?.chapters[0].videos[0]
        || {
            id: 0,
            title: "",
            description: "",
            video: "",
            duration: "",
        }
    )
    const [activeTab, setActiveTab] = useState<number>(0)

    const changeVideo = useCallback((video: any) => {
        setCurrentVideo(video)
    }, [currentVideo])


    useEffect(() => {
        if (query.data)
            setCurrentVideo(query.data?.chapters[0].videos[0])
    }, [query.data?.chapters[0].videos[0]])

    function onVideofinishedPlaying() {
        let chapter = progression.data.last_chapter_index
        let video = progression.data.last_video_index
        if (query.data?.chapters[chapter].videos[video].id === currentVideo.id) {
            mutation.mutate()
        }
    }
    const handleVideoFinish = useCallback(onVideofinishedPlaying, [currentVideo])


    if (query.isError)
        return <Typography>Error</Typography>
    if (query.isLoading)
        return <Typography>Loading...</Typography>
    if (!query.data)
        return <>Error in data</>

    if (!progression.data)
        return <>Error in data</>
    if (progression.isLoading)
        return <Typography>Loading...</Typography>
    if (progression.isError)
        return <>Error in data</>

    const chaptersWithUUID = query.data?.chapters
        .sort((a: Chapter, b: Chapter) => a.id)
        .map((chapter: any) => {
            return { ...chapter, key: uuidv4() }
        })

    return (
        <Grid
            container
            columns={14}
            direction='column'
            spacing={5}
            id={'main-grid-container'}
            sx={{
                backgroundColor: "white",
                maxWidth: '100%',
                minHeight: '100vh',
            }}>

            <Grid item xs={14} sx={{
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
                <Box sx={{
                    gridRow: '1',
                    gridColumn: '1 / -1',
                }}>
                    <Typography color={'primary.main'} variant={'body2'}>
                        تم إتمام 5% من الكورس
                    </Typography>
                    <Slider
                        size={'medium'}
                        value={5}
                        onChange={() => { }}
                        sx={{
                            scale: '-1 1',
                            height: 6,
                            mb: 1,
                            ".MuiSlider-thumb": {
                                display: 'none',
                            },
                            "&.Mui-disabled": {
                                color: `${theme.palette.primary.main} !important`,
                            },
                            "& .MuiSlider-rail": {
                                bgcolor: theme.palette.gray.dark,
                            }
                        }}
                        disabled

                    />
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: '0',
                    gridRow: '2 ',
                    gridColumn: '1 / 5',
                    gap: 2,
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <Typography
                            variant={'body1'}
                            sx={{
                            }}
                        >
                            محتوى الكورس
                        </Typography>
                        <Button
                            variant={'contained'}
                            color={'gray'}
                            sx={{
                                flexGrow: 1,
                                color: 'white',
                                py: 1.5,
                            }}
                        >
                            الشهادة
                        </Button>
                    </Box>
                    {chaptersWithUUID?.map((chapter: any, index: number) => {
                        console.log("chapters thingy, ", index, progression.data?.last_chapter_index);
                        return <React.Fragment key={chapter.key}>
                            <ChapterAccordion
                                setCurrentVideo={changeVideo}
                                chapter={chapter}
                                activeVideo={currentVideo}
                                locked={!(progression.data && index <= progression.data?.last_chapter_index)}
                                progressionVideoIndex={progression.data.last_video_index}
                                progresssionChapterIndex={progression.data?.last_chapter_index}
                                chapterIndex={index}
                            />
                        </React.Fragment>
                    })}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    gridRow: '2 ',
                    gridColumn: '5 / -1',

                }}>
                    <VideoPlayer video={currentVideo} onVideoFinish={handleVideoFinish} />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 4,
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >

                        <Tabs
                            variant={'fullWidth'}
                            indicatorColor='primary'
                            textColor='primary'
                            value={activeTab}
                            onChange={(e, value) => setActiveTab(value)}
                            sx={{
                                width: '100%',
                                color: theme.palette.secondary.main,
                                flexBasis: '75%'
                            }}
                        >
                            <Tab label={"تقديم الدرس"} {...a11yProps} />
                            <Tab label={"ملحقات"} {...a11yProps} />
                            <Tab label={"تقييم"} {...a11yProps} />
                        </Tabs>
                        <MainButton text={'hello'}
                            sx={{
                                // flexGrow: 1,
                                width: '100%',
                                flexBasis: '25%',
                                bgcolor: 'white',
                                borderWidth: '1p'
                            }} />
                    </Box>

                    <TabPanel value={activeTab} index={0}>
                        <Box display={'flex'} flexDirection={'column'} gap={8}>
                            <Box
                                display={'flex'}
                                gap={8}
                                sx={{
                                    alignItems: 'center',
                                    justifyContent: 'flex-start'
                                }}>
                                <Typography variant={'body1'} color={'gray.dark'} flexShrink={1} width={"40%"}>
                                    حول الدرس
                                </Typography>
                                <Typography color={'gray.main'} variant={'body1'} flexShrink={1} flexGrow={1} width={'100%'}>
                                    {currentVideo.description}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box
                                display={'flex'}
                                gap={8}
                                sx={{
                                    alignItems: 'center',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Typography variant={'body1'} color={'gray.dark'} flexShrink={1} width={"40%"}>
                                    حول الأستاذ
                                </Typography>
                                <Typography color={'gray.main'} variant={'body1'} flexShrink={1} flexGrow={1} width={'100%'}>
                                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق
                                </Typography>
                                <Avatar
                                    src={query.data?.owner.profile_image}
                                    sx={{
                                        width: theme.spacing(20),
                                        height: theme.spacing(20),
                                    }}
                                />
                            </Box>

                        </Box>
                    </TabPanel>
                    <TabPanel value={activeTab} index={1}>
                        <Box display="flex" justifyContent={'space-between'} gap={8} alignItems={'center'}>
                            <Box>
                                <Typography variant={'body1'} color={'gray.dark'}>
                                    اسم الملف
                                </Typography>
                                <Typography color={'gray.main'} variant={'body1'}>
                                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق
                                </Typography>
                            </Box>
                            <a download="presentation" target="_blank" href={query.data?.presentation_file} >
                                <MainButton
                                    sx={{ width: '50%' }}
                                    text='تحميل'
                                    color={theme.palette.primary.main}
                                />
                            </a>
                        </Box>
                    </TabPanel>
                    <TabPanel value={activeTab} index={2}>
                        3
                    </TabPanel>

                </Box>
            </Grid>
        </Grid >
    )
}


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default WatchCourse