import { useEffect } from 'react';
import { User } from '../../../types/user';
import { useNavigate } from 'react-router-dom';
import useReduxData from '../../../stores/reduxUser';

export default function useIsNotSelf(target: User | undefined, returnUrl: string = '/') {
    const user = useReduxData().user.user;
    const navigate = useNavigate();
    useEffect(() => {
        if (!target) return;
        if (user?.pk === target.pk) navigate(returnUrl);
    }, []);
}
