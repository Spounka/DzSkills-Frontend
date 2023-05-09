import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../../authenticate/hooks/useLogin';
import { AdminPanelTopBar } from '../landing-page/components/AdminPanelTopBar';
import { NotificationsBar } from '../landing-page/components/NotificationsBar';
import { AdminPanelSidebar } from '../landing-page/components/Sidebar';
import { DisplayTableDataGrid } from '../payment-management/DisplayTableDataGrid';
import { getAllUsers } from './api/getUsers';
import { yellow } from '@mui/material/colors';


const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 60,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'avatar',
        headerName: '',
        width: 100,
        sortable: false,
        align: 'center',
        headerClassName: 'super-app-theme--header',
        renderCell: (params) => {
            return <Avatar
                src={params.value}
                sx={{
                    alignItems: 'center',
                    justifyItems: 'center',
                    justifySelf: 'center',
                    placeSelf: 'center',
                    mx: 'auto'
                }}
            >
                A
            </Avatar>
        }
    },
    {
        field: 'username',
        headerName: 'اسم المستخدم',
        width: 160,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'fullName',
        headerName: 'الاسم',
        width: 210,
        headerClassName: 'super-app-theme--header',
    },
    {
        field: 'status',
        headerName: 'الحالة',
        width: 100,
        headerClassName: 'super-app-theme--header',
        flex: 1,
    },
    {
        field: 'link',
        headerName: '',
        headerClassName: 'super-app-theme--header',
        // flex: 0,
        width: 130,
        align: 'left',
        renderCell: (params) => {
            return <>
                <Link to={'/admin/users/' + params.id + '/'}>
                    <Typography sx={{ p: 1, color: yellow[800] }}>
                        View profile
                    </Typography>
                </Link>

            </>
        },
        // width: 160,
    },
];

function UserManagement() {
    const theme = useTheme()
    useLogin()
    const navigate = useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer() {
        setDrawerOpen(val => !val)
    }
    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers()
    })

    if (query.isLoading)
        return <>Loading..</>
    if (query.isError)
        return <>Error...</>

    const rows = query.data?.map((user) => {
        return {
            id: user.pk,
            avatar: user.profile_image,
            fullName: user.first_name + " " + user.last_name,
            username: user.username,
            status: 'user',
            params: [() => navigate('/'),]
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
                        <DisplayTableDataGrid rows={rows} columns={columns} />

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

}


function PaymentDetails({ }) {
    return (<Box display="flex" alignItems={'center'} gap={2} justifyContent={"space-between"}>
        <Avatar>H</Avatar>
        <Typography variant={'body2'} sx={{
            flexGrow: 0
        }}>
            هنا عنوان الكورس
        </Typography>
        <Typography variant={'button'} color={'gray.main'}>
            1234
        </Typography>
        <Typography variant={'button'} color={'gray.main'}>
            Date
        </Typography>
        <Typography variant={'button'} color={'gray.main'} flexGrow={0}>
            Username
        </Typography>
        <Typography variant={'button'} color={'gray.main'} flexGrow={0}>
            PRICE
        </Typography>
        <Typography variant={'button'} color={'gray.main'} flexGrow={0}>
            STATUS
        </Typography>
        <Typography variant={'button'} color={'gray.main'} flexGrow={0}>
            LINK
        </Typography>
    </Box>);
}
export default UserManagement