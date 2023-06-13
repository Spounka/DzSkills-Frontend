import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from './api/queries';

function Logout() {
    const token = localStorage.getItem('access');
    const navigate = useNavigate();
    const logoutQuery = useQuery({
        queryKey: ['user', 'logout'],
        queryFn: () => logout(token),
        onSuccess: () => {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            navigate('/');
        },
    });
    return <div>Logout</div>;
}

export default Logout;
