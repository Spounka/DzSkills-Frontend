import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from './api/queries';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/userSlice';
import { useEffect } from 'react';

function Logout() {
    const token = localStorage.getItem('access');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const logoutQuery = useQuery({
        queryKey: ['user', 'logout'],
        queryFn: () => logout(token),
        onSuccess: async () => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            dispatch(removeUser);
            navigate('/');
        },
    });
    useEffect(() => {
        (async () => await logoutQuery.refetch())();
    });
    return <div>Logout</div>;
}

export default Logout;
