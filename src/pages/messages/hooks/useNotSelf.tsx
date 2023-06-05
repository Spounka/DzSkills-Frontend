import { useEffect } from 'react';
import { User } from '../../../types/user';
import useLogin from '../../authenticate/hooks/useLogin';
import { useNavigate } from 'react-router-dom';

export default function useIsNotSelf(target: User | undefined, returnUrl: string = '/') {
    const [user] = useLogin();
    const navigate = useNavigate();
    useEffect(() => {
        if (!target) return;
        if (user.data?.pk === target.pk) navigate(returnUrl);
    }, []);
}
