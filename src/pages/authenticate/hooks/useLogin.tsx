import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetUser } from '../../../globals/hooks';

function useLogin() {
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        const url = new URL(window.location.href);
        if (url.pathname !== '/') setUrl(url.pathname);
    }, [window.location.href]);
    const navigate = useNavigate();
    return useGetUser({
        onSuccess: response => {
            if (!response.email_valid) navigate(`/register/verify-email/?next=${url}`);
        },
        onError: () => navigate(`/login/?next=${url}`),
    });
}

export default useLogin;
