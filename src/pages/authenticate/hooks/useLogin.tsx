import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../edit-profile/api/getUser'

function useLogin() {
    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    const query = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token, refresh),
        onSuccess: () => console.log('Success'), //navigate('/profile'),
        onError: () => navigate('/login')
    })
    return [query]
}

export default useLogin