import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../redux/userSlice';
import { getUser } from '../../edit-profile/api/getUser';

function useLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const query = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
        onSuccess: response => {
            dispatch(updateUser({ user: response }));
            !response.email_valid && navigate('/register/verify-email/');
        },
        onError: () => navigate('/register'),
    });
    return [query];
}

export default useLogin;
