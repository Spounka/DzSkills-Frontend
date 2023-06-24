import { styled } from '@mui/material';
import Card, { CardProps } from '@mui/material/Card';

export const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
    display: 'flex',
    // minHeight: '100%',
    width: '100%',
    flexDirection: 'column',
    boxShadow: '7px 20px 40px #00000014',
    borderRadius: theme.spacing(),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    gap: theme.spacing(2),
}));
