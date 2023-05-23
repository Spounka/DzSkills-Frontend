import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { yellow } from '@mui/material/colors';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../../authenticate/hooks/useLogin';
import AdminDashboardLayout from '../layout';
import { DisplayTableDataGrid } from '../payment-management/DisplayTableDataGrid';
import { getAllUsers } from './api/getUsers';

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
        renderCell: params => {
            return (
                <Avatar
                    src={params.value}
                    sx={{
                        alignItems: 'center',
                        justifyItems: 'center',
                        justifySelf: 'center',
                        placeSelf: 'center',
                        mx: 'auto',
                    }}
                >
                    A
                </Avatar>
            );
        },
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
        renderCell: params => {
            return (
                <>
                    <Link to={'/admin/users/' + params.id + '/'}>
                        <Typography sx={{ p: 1, color: yellow[800] }}>
                            View profile
                        </Typography>
                    </Link>
                </>
            );
        },
        // width: 160,
    },
];

function UserManagement() {
    useLogin();
    const navigate = useNavigate();
    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    });

    if (query.isLoading) return <>Loading users..</>;
    if (query.isError) return <>Error loading users...</>;

    const rows = query.data?.map(user => {
        return {
            id: user.pk,
            avatar: user.profile_image,
            fullName: user.first_name + ' ' + user.last_name,
            username: user.username,
            status: 'user',
            params: [() => navigate('/')],
        };
    });

    return (
        <AdminDashboardLayout topbar_title={'المستخدمين'}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 0,
                }}
            >
                <DisplayTableDataGrid
                    rows={rows}
                    columns={columns}
                />
            </Box>
        </AdminDashboardLayout>
    );
}

export default UserManagement;
