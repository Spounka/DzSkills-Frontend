import { OutlinedInput, OutlinedInputProps, styled, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

const SytledOutline = styled(OutlinedInput)<OutlinedInputProps>(({ theme }) => ({
    transition: 'all 100ms ease',
    '&.MuiOutlinedInput-input:hover': {
        padding: 100,
    },
    '&.Mui-focused': {
        color: theme.palette.gray.dark,
    },
}));
export default function EditProfileField({ name, type, text, multiline }: any) {
    const theme = useTheme();
    return <>
        <Box sx={{
            width: "full",
            display: 'flex',
            flexDirection: 'column',
            grow: 'true',
            flexGrow: '1'
        }}>
            <Typography fontWeight={600} sx={{
                px: theme.spacing(2),
                pb: theme.spacing(2),
                color: theme.palette.gray.dark,
            }}>
                {text}
            </Typography>
            {multiline ?

                <SytledOutline
                    name={name}
                    type={type}
                    color="secondary"
                    size={'small'}
                    fullWidth={true}
                    multiline
                    rows={2}
                    sx={{
                        borderRadius: theme.spacing(),
                        flexGrow: 'true',
                        fontWeight: theme.typography.body1,
                        color: theme.palette.gray.main,
                    }} />
                :
                <SytledOutline
                    name={name}
                    type={type}
                    color="secondary"
                    size={'small'}
                    fullWidth={true}
                    sx={{
                        borderRadius: theme.spacing(),
                        flexGrow: 'true',
                        fontWeight: theme.typography.body1,
                        color: theme.palette.gray.main,
                    }} />
            }
        </Box>
    </>;
}
