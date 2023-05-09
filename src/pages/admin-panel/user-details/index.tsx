import { Switch, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import money from '../../../assets/svg/money-white.svg';
import students from '../../../assets/svg/school-blue.svg';
import starsBlue from '../../../assets/svg/stars-blue.svg';
import studiesBlue from '../../../assets/svg/studies-blue.svg';
import { Course } from '../../../types/course';
import useLogin from '../../authenticate/hooks/useLogin';
import NotFound from '../../not-found/NotFound';
import { InformationCard } from '../landing-page/InformationCard';
import { AdminPanelTopBar } from '../landing-page/components/AdminPanelTopBar';
import { NotificationsBar } from '../landing-page/components/NotificationsBar';
import { AdminPanelSidebar } from '../landing-page/components/Sidebar';
import { getRelatedCourses, getUserByID } from './api/getUserById';
import { UserDetailsWideRibbon } from './components/UserDetailsWideRibbon';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 40,
    },
    {
        field: 'name',
        headerName: 'الاسم',
        width: 100,
        flex: 1,
    },
    {
        field: 'sales',
        headerName: 'المبيعات',
        width: 100,
    },
    {
        field: 'rating',
        headerName: 'التقييم',
        width: 100,
    },
    {
        field: 'profit',
        headerName: 'المداخيل',
        width: 200,
    },
    {
        field: 'visits',
        headerName: 'الزيارات',
        width: 100,
    },
    {
        field: 'state',
        headerName: 'الحالة',
        width: 150,
        renderCell: (params) => {
            return <Switch defaultChecked checked={params.value} />

        }
    },

]

const UserDetails = () => {
    const params = useParams()

    if (!params || !params.id)
        return <Typography>Error</Typography>

    // @ts-ignore
    if (isNaN(params.id))
        return <NotFound />


    const id: number = parseInt(params.id)
    const theme = useTheme()
    useLogin()
    const navigate = useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer() {
        setDrawerOpen(val => !val)
    }


    const query = useQuery({
        queryKey: ['users', id],
        queryFn: () => getUserByID(id),
        staleTime: 1000 * 60 * 60
    })

    const relatedCoursesQuery = useQuery({
        queryKey: ['users', id, 'courses'],
        queryFn: () => getRelatedCourses(id),
        staleTime: 1000 * 60 * 60 * 24,
    })


    if (query.isLoading)
        return <>Loading..</>
    if (query.isError)
        return <>Error...</>

    if (relatedCoursesQuery.isLoading)
        return <>Loading Related Courses..</>
    if (relatedCoursesQuery.isError)
        return <>Error In Related Courses...</>
    if (!relatedCoursesQuery.data)
        return <>Error In Related Courses...</>


    const rows = relatedCoursesQuery.data.map((course: Course | undefined) => {
        return {
            id: course?.id,
            name: course?.title,
            sales: 100,
            rating: 2.5,
            profit: 150000,
            visits: 120,
            state: Boolean(Math.floor(Math.random() * 2)),
        }
    })

    return (
        <Box sx={{
            p: 0,
            flexGrow: 1,
            display: 'grid',
            width: '100%',
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
                <AdminPanelSidebar />
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
                    title={'المستخدمين'}
                    subtitle={''}
                    mainColor={theme.palette.secondary.main} />
                <Box sx={{
                    gridColumn: '1 / -3',
                    gridRow: '2 / 16',
                    height: '100%',

                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            p: 0

                        }}

                    >
                        {/* <DisplayTableDataGrid rows={rows} columns={columns} /> */}
                        <UserDetailsWideRibbon user={query.data} />

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                p: 0

                            }}

                        >
                            <InformationCard
                                title={'الكورسات'}
                                subtitle={'0'}
                                icon={studiesBlue}
                                sx={{
                                    flexBasis: '20%',
                                    flexShrink: '1',
                                }}
                            />
                            <InformationCard
                                title={'عدد الطلبة'}
                                subtitle={'12'}
                                icon={students}
                                sx={{
                                    flexBasis: '25%',
                                    flexGrow: '1',
                                }}
                            />

                            <InformationCard
                                title={'متوسط التقييم'}
                                subtitle={'2'}
                                icon={starsBlue}
                                sx={{
                                    flexBasis: '25%',
                                    flexGrow: '1',
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
                        </Box>
                        {relatedCoursesQuery.data.length > 0 &&
                            <Box sx={{
                                bgcolor: 'white',
                                borderRadius: theme.spacing(),
                                p: 2
                            }}
                            >
                                <Typography color={'secondary.main'}>احصائيات الكورسات</Typography>
                                <DataGrid
                                    sx={{
                                        border: 'none'
                                    }}
                                    columns={columns}
                                    rows={rows}
                                    autoHeight
                                />
                            </Box>
                        }
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
                    <NotificationsBar mainColor={theme.palette.secondary.main} drawerOpen={drawerOpen} />
                </Box>
            </Box >
        </Box >
    )

};

export default UserDetails;