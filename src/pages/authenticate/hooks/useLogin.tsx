import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetUser } from '../../../globals/hooks';
import { User } from '../../../types/user';

function useLogin() {
    const [url, setUrl] = useState<string>('');
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate();
    useGetUser({
        onSuccess: response => {
            setUser(response)
            if (!response.email_valid) navigate(`/register/verify-email/?next=${url}`);
        },
        onError: () => {
            console.log('there is no user')
            setUser(null)
            navigate(`/login/?next=${url}`)
        }
    });
    useEffect(() => {
        const url = new URL(window.location.href);
        if (url.pathname !== '/') setUrl(url.pathname);
    }, [window.location.href]);
    return user;
}

export default useLogin;
