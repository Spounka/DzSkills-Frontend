import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from './api/queries';
import { useDispatch } from 'react-redux';
import { removeUser, updateUser } from '../../redux/userSlice';
import { useEffect } from 'react';

function Logout() {
    const token = localStorage.getItem('access');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const logoutQuery = useQuery({
        queryKey: ['user', 'logout'],
        queryFn: () => logout(token),
        onSuccess: () => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/');
        },
    });
    useEffect(() => {
        logoutQuery.refetch();
    }, []);
    return <div>Logout</div>;
}

export default Logout;
