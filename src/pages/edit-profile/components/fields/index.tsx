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

interface props {
    name: string,
    type: string,
    label: string,
    placeholder?: string,
    multiline?: boolean,
    grow?: boolean,
}

export default function EditProfileField({ name, type, label, placeholder, multiline, grow }: props) {
    const theme = useTheme();
    return <>
        <Box sx={{
            width: "full",
            display: 'flex',
            flexDirection: 'column',
            grow: 'true',
            flexGrow: grow ? '1' : '0'
        }}>
            <Typography fontWeight={600} sx={{
                px: theme.spacing(2),
                pb: theme.spacing(2),
                color: theme.palette.gray.dark,
            }}>
                {label}
            </Typography>
            {multiline ?

                <SytledOutline
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    color="secondary"
                    size={'small'}
                    fullWidth={true}
                    multiline
                    rows={2}
                    sx={{
                        borderRadius: theme.spacing(),
                        fontWeight: theme.typography.body1,
                        color: theme.palette.gray.main,
                    }} />
                :
                <SytledOutline
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    color="secondary"
                    size={'small'}
                    fullWidth={true}
                    sx={{
                        borderRadius: theme.spacing(),
                        fontWeight: theme.typography.body1,
                        color: theme.palette.gray.main,
                    }} />
            }
        </Box>
    </>;
}
