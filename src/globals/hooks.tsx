import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../pages/edit-profile/api/getUser';
import { updateUser } from '../redux/userSlice';
import { User } from '../types/user';
import { defaultUser } from './default-values';

function useRouteID() {
    const params = useParams();
    const navigate = useNavigate();

    if (!params?.id) navigate('/not-found/');

    if (isNaN(Number(params.id))) navigate('/not-found/');

    return parseInt(params.id as string);
}

function useSetUserOptimistic() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token && token !== '') {
            console.log('kayen access')
            dispatch(updateUser({ access: token ?? '', refresh: '', user: { ...defaultUser.user, username: 'username', email_valid: true } }))
        }
    }, [])
}

interface GetUserProps {
    onSuccess?: (b?: any) => void;
    onError?: (b?: any) => void;
}

function useGetUser({ onSuccess, onError }: GetUserProps) {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
        onSuccess: (user: User) => {
            dispatch(
                updateUser({ access: token ?? '', refresh: refresh ?? '', user: user })
            );
            onSuccess?.(user);
        },
        onError: err => {
            onError?.(err);
        },
    });
    return userQuery.data;
}

export { useRouteID, useGetUser, useSetUserOptimistic };
