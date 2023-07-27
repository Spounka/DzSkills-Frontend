import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { StyledOutline } from '../../../../components/form/StyledOutline';

interface props {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    multiline?: boolean;
    grow?: boolean;
    rows?: number;
    typographyProps?: any;
    fontWeight?: number;
    required?: boolean;
}

export default function EditProfileField({
    name,
    type,
    label,
    placeholder,
    multiline,
    grow,
    rows,
    required,
    typographyProps,
    fontWeight,
}: props) {
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    width: 'full',
                    display: 'flex',
                    flexDirection: 'column',
                    grow: 'true',
                    flexGrow: grow ? '1' : '0',
                }}
            >
                <Typography
                    fontWeight={fontWeight || 600}
                    sx={{
                        px: theme.spacing(2),
                        pb: theme.spacing(2),
                        color: theme.palette.gray.dark,
                    }}
                    {...typographyProps}
                >
                    {label}
                </Typography>
                {multiline ? (
                    <StyledOutline
                        required={required}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        color="secondary"
                        size={'small'}
                        fullWidth={true}
                        multiline
                        rows={rows ?? 2}
                    />
                ) : (
                    <StyledOutline
                        required={required}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        color="secondary"
                        size={'small'}
                        fullWidth={true}
                    />
                )}
            </Box>
        </>
    );
}
