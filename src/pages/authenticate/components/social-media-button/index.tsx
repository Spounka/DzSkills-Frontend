import styled from '@emotion/styled';
import { Button, ButtonProps } from '@mui/material';

const SocialMediaButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: '100%',
    padding: '.8rem 2rem',
    borderRadius: '0.5rem',
    justifyContent: 'space-between',
    // @ts-ignore
    color: `${theme.palette.gray.dark}`,
    fontWeight: 400,
    fontSize: '.7rem',
    textAlign: 'center',
}));

export default SocialMediaButton;
