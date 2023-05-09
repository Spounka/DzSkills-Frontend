import {Avatar, Box, Divider, IconButton, MenuItem, Popover, Rating, Typography, useTheme} from '@mui/material';
import React, {useState} from 'react';
import {useQuery} from 'react-query';
import {v4 as uuidv4} from 'uuid';
import useLogin from '../../authenticate/hooks/useLogin';
import {getCourses} from '../../courses-page/api/getAllCourses';
import {InformationCard} from '../landing-page/InformationCard';
import {AdminPanelTopBar} from '../landing-page/components/AdminPanelTopBar';
import {NotificationsBar} from '../landing-page/components/NotificationsBar';
import {AdminPanelSidebar} from '../landing-page/components/Sidebar';

import facebook from '../../../assets/svg/Facebook_Square.svg';
import instagram from '../../../assets/svg/Instagram_Square.svg';
import linkedin from '../../../assets/svg/LinkedIn_Square.svg';
import twitter from '../../../assets/svg/Twitter_Square.svg';

import createBlack from '../../../assets/svg/create-black.svg';
import deleteWhiteBg from '../../../assets/svg/delete-whitebg.svg';
import messageWhitebg from '../../../assets/svg/message-whitebg.svg';

import {MoreHoriz, Star} from '@mui/icons-material';
import Image from 'mui-image';
import {useParams} from 'react-router-dom';
import money from '../../../assets/svg/money-white.svg';
import students from '../../../assets/svg/school-blue.svg';
import timeBlue from '../../../assets/svg/time-transparent.svg';
import {getCourse} from '../../course/api/getCourse';
import NotFound from '../../not-found/NotFound';
import {getRelatedStudents, RelatedStudent} from "./api/relatedStudent";
import {CourseStudent} from "./components/courseStudent";

function CourseDetails() {
    const params = useParams()

    if (!params || !params.id)
        return <Typography>Error</Typography>

    // @ts-ignore
    if (isNaN(params.id))
        return <NotFound/>


    const id: number = parseInt(params.id)
    const theme = useTheme()
    useLogin()
    const [drawerOpen, setDrawerOpen] = useState(false);


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        setAnchorEl(null)
    }

    function toggleDrawer() {
        setDrawerOpen(val => !val)
    }

    const token = localStorage.getItem('access_token')

    const course = useQuery({
        queryKey: ['courses', id],
        queryFn: () => getCourse(id),
        staleTime: 1000 * 60 * 60 * 24,
    })

    const query = useQuery({
        queryKey: ['courses'],
        queryFn: () => getCourses(token),
    })

    const relatedStudentsQuery = useQuery({
        queryKey: ['courses', id, 'students'],
        queryFn: () => getRelatedStudents(id),
    })

    if (query.isError)
        return <Typography>Error Occured In courses</Typography>
    if (query.isLoading)
        return <Typography>Loading courses...</Typography>

    if (relatedStudentsQuery.isError)
        return <Typography>Error occured getting related students</Typography>
    if (relatedStudentsQuery.isLoading)
        return <Typography>Loading related students...</Typography>


    return (
        <Box sx={{
            p: 0,
            flexGrow: 1,
            display: 'grid',
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            gridTemplateColumns: 'repeat(26, 1fr)',
            gap: theme.spacing(1),
            rowGap: theme.spacing(2),
            bgcolor: theme.palette.gray.secondary,
        }}>

            <Box
                display={'grid'}
                gridColumn={'span 5'}
                height={'100%'}
                width={'100%'}
            >
                <AdminPanelSidebar/>
            </Box>
            <Box
                display={'grid'}
                gridTemplateColumns={'repeat(26 , 1fr)'}
                gridColumn={'7 / -1'}
                gridRow={1}
                rowGap={3}
                padding={0}
                pb={8}
                paddingTop={4}
                width={'100%'}
                height={'100%'}
            >

                <AdminPanelTopBar onNotificationClick={toggleDrawer}
                                  title={'الكورسات'}
                                  subtitle={''}
                                  mainColor={theme.palette.secondary.main}/>
                <Box sx={{
                    gridColumn: '1 / -3',
                    gridRow: '2 / 16',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,

                }}>

                    <Box
                        sx={{
                            display: 'flex',
                            // justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            p: 0
                        }}
                    >
                        <InformationCard
                            title={'متوسط التقييم'}
                            subtitle={'0'}
                            icon={timeBlue}
                            sx={{
                                flexBasis: '20%',
                                flexShrink: '1',
                            }}
                        />
                        <InformationCard
                            title={'عدد الطلبة'}
                            subtitle={'5'}
                            icon={students}
                            sx={{
                                flexBasis: '25%',
                                flexGrow: '0',
                            }}
                        />

                        <InformationCard
                            title={'إجمالي الأرباح'}
                            subtitle={'250000DA'}
                            icon={money}
                            sx={{
                                flexBasis: '20%',
                                flexShrink: '1',
                                bgcolor: theme.palette.secondary.main,
                                color: 'white',
                            }}
                        />

                        <>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreHoriz/>
                            </IconButton>
                            <Popover
                                id="long-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}

                                PaperProps={{
                                    elevation: 0,
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: '20ch',
                                        backgroundColor: 'transparent',
                                    },
                                    sx: {

                                        // root: {
                                        '.Popover-menuItem': {
                                            display: 'inline-block',
                                            backgroundColor: 'red'
                                        }
                                        // }
                                    }
                                }}
                                sx={{}}
                            >
                                <MenuItem disableRipple>
                                    <IconButton>
                                        <Image
                                            src={messageWhitebg}
                                            width={'auto'}
                                        />
                                    </IconButton>
                                </MenuItem>
                                <MenuItem disableRipple>
                                    <IconButton>
                                        <Box sx={{
                                            width: theme.spacing(6.5),
                                            p: theme.spacing(1.5),
                                            bgcolor: 'white',
                                            borderRadius: theme.spacing()
                                        }}>
                                            <Image src={createBlack} width={'auto'}/>
                                        </Box>
                                    </IconButton>
                                </MenuItem>
                                <MenuItem disableRipple>
                                    <IconButton>
                                        <Image src={deleteWhiteBg} width={'auto'}/>
                                    </IconButton>
                                </MenuItem>
                            </Popover>
                        </>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'row',
                            gap: 2,
                            height: '100%',
                            pb: 8,
                        }}

                    >

                        <Box
                            sx={{
                                flexBasis: '50%',
                                width: '100%',
                                p: 1,
                                pb: 0,
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                            {
                                // @ts-ignore
                                <Image width={'auto'}
                                       src={(course.data?.thumbnail && course.data?.thumbnail) || ""}
                                    // @ts-ignore
                                       sx={{
                                           aspectRatio: '16/9'
                                       }}
                                />
                            }
                            <Box
                                sx={{
                                    px: theme.spacing(8),
                                    bgcolor: '#F9FAF5',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 3,
                                    py: 4,

                                }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <Box>
                                        <Typography variant="h6">
                                            {course.data?.title}
                                        </Typography>
                                        <Typography variant={'subtitle1'} color={'gray.main'}>
                                            {course.data?.owner.first_name + " " + course.data?.owner.last_name}
                                        </Typography>
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <Typography color={'gray.main'} variant={'subtitle1'}>
                                            {2.5}
                                        </Typography>
                                        <Rating max={1} readOnly value={1}
                                                emptyIcon={<Star style={{opacity: 0.55}} fontSize="inherit"/>}
                                        />
                                    </Box>
                                </Box>
                                <Typography variant={'body2'} color={'gray.dark'}>
                                    {course.data?.description}
                                </Typography>
                                <Typography sx={{
                                    direction: 'ltr',
                                    mr: 'auto',
                                    float: 'right',
                                }}>
                                    {course.data?.price} DA
                                </Typography>
                            </Box>
                            <Box sx={{
                                bgcolor: 'purple.main',
                                p: 8,
                                pb: 4,
                                color: 'white',


                            }}>
                                <Avatar src={course.data?.owner.profile_image} sx={{
                                    width: theme.spacing(12),
                                    height: theme.spacing(12),
                                    float: 'left',
                                }}>

                                </Avatar>
                                <Box display={'flex'} gap={3} flexDirection={'column'}>
                                    <Typography variant="h6">
                                        {course.data?.owner.first_name + " " + course.data?.owner.last_name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                        Dolor eveniet deserunt provident numquam animi suscipit id! Consectetur, ea a.
                                        Saepe vero ea quae placeat enim amet quasi quisquam beatae maxime!
                                    </Typography>

                                    <Box display={'flex'} gap={2}>
                                        <img
                                            style={{
                                                width: theme.spacing(4),
                                                height: theme.spacing(4)
                                            }}
                                            src={instagram}
                                            alt="instagram logo"/>
                                        <img
                                            style={{
                                                width: theme.spacing(4),
                                                height: theme.spacing(4)
                                            }}
                                            src={linkedin}
                                            alt="linkedin logo"/>
                                        <img
                                            style={{
                                                width: theme.spacing(4),
                                                height: theme.spacing(4)
                                            }}
                                            src={facebook}
                                            alt="facebook logo"/>
                                        <img
                                            style={{
                                                width: theme.spacing(4),
                                                height: theme.spacing(4)
                                            }}
                                            src={twitter}
                                            alt="twitter logo"/>
                                    </Box>

                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                flexBasis: '50%',
                                height: '100%',
                                width: '100%',
                                bgcolor: 'white',
                                mt: theme.spacing(),
                                pb: theme.spacing(),
                                maxHeight: '100%',
                                overflowY: 'scroll',
                                scrollBehavior: 'smooth',
                            }}
                        >
                            <Box sx={{
                                p: theme.spacing(4),
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,


                            }}>
                                <Typography color={'secondary.main'}>
                                    الطلبة
                                </Typography>
                                <Divider/>

                            </Box>
                            {relatedStudentsQuery.data?.map((student: RelatedStudent) => {
                                return (
                                    <CourseStudent key={uuidv4()} student={student} theme={theme}/>
                                )
                            })}
                        </Box>


                    </Box>
                </Box>
                <Box sx={{
                    gridColumn: '-1 / -7',
                    gridRow: '2',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    overflow: 'hidden',

                }}>
                    <NotificationsBar mainColor={theme.palette.secondary.main} drawerOpen={drawerOpen}/>
                </Box>
            </Box>
        </Box>
    )

}

export default CourseDetails