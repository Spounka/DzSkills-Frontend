import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../../redux/userSlice'
import { getUser } from '../../edit-profile/api/getUser'

function useLogin() {
    const location = window.location.href

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    const query = useQuery({
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
        onSuccess: (response) => dispatch(updateUser({ user: response })),
        onError: () => navigate('/login')
    })
    return [query]
}

export default useLogin