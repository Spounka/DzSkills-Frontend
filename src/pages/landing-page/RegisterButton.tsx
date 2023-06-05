import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { MainButton } from '../../components/ui/MainButton';

export function RegisterButton({}) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <MainButton
            color="secondary"
            text={'انشاء حساب'}
            {...{
                variant: 'outlined',
                sx: {
                    // borderWidth: '2px',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    bgcolor: 'white',
                    fontSize: theme.typography.button,
                },
                onClick: () => navigate('/register'),
            }}
        />
    );
}
