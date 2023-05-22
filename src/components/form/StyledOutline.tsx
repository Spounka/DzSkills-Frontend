import { OutlinedInput, OutlinedInputProps, styled } from '@mui/material';

export const StyledOutline = styled(OutlinedInput)<OutlinedInputProps>(
    ({ theme }) => ({
        '&': {
            transition: 'all 100ms ease',
            borderRadius: theme.spacing(),
            fontWeight: theme.typography.body1,
            color: theme.palette.gray.main,
        },
        '&:hover': {
            outline: 'none',
            border: 'none',
        },
        '&.Mui-focused': {
            color: theme.palette.gray.dark,
        },
    })
);
