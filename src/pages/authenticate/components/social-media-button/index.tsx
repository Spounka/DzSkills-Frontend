import styled from '@emotion/styled';
import { Button, ButtonProps } from '@mui/material';

const SocialMediaButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: '100%',
    padding: '.8rem 3rem',
    borderRadius: '0.5rem',
    justifyContent: 'space-evenly',
    // @ts-expect-error
    gap: theme.spacing(2),
    // @ts-expect-error
    color: `${theme.palette.gray.dark}`,
    // fontWeight: 400,
    // fontSize: '.7rem',
    // textAlign: 'center',
}));

export default SocialMediaButton;
