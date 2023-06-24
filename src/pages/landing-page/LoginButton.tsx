import { useTheme } from '@mui/material/styles';
import { MainButton } from '../../components/ui/MainButton';
import { useNavigate } from 'react-router';

export function LoginButton({}) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        //@ts-ignore
        <MainButton
            color={theme.palette.primary.main}
            text={'تسجيل الدخول'}
            {...{
                onClick: () => navigate('/login'),
                variant: 'filled',
            }}
        />
    );
}
