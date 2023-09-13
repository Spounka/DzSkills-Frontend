import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from './api/queries';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/userSlice';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import { resetAxiosInstances } from '../../globals/axiosInstance';


function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const logoutMutation = useMutation({
        mutationKey: ['user', 'logout'],
        mutationFn: async () => {
            const { data } = await logout()
            return data;
        },
        onSuccess: async () => {
            navigate('/');
        },
    })
    useEffect(() => {
        queryClient.clear()
        dispatch(removeUser());
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        resetAxiosInstances();
        logoutMutation.mutate()
    }, []);
    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
                minHeight: '80dvh',
                height: '100%'
            }}
        >
            <CircularProgress sx={{ width: 24, height: 'auto' }} />
        </Stack>
    )
}

export default Logout;
