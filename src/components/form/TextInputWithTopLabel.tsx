import { FormControl, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';

interface props {
    label: string;
    name: string;
    helperText?: string;
    placeholder?: string;
}
const TextInputWithTopLabel = ({ label, placeholder, helperText, name }: props) => {
    const theme = useTheme();
    return (
        <TextField
            label={label}
            color="secondary"
            placeholder={placeholder || ''}
            helperText={helperText || ''}
            name={name}
            margin={'normal'}
            sx={{
                direction: 'rtl',
            }}
            InputLabelProps={{
                shrink: true,
                sx: {
                    '*': {
                        color: theme.palette.secondary.main,
                        '&:focused:not($error)': {
                            color: theme.palette.secondary.light,
                        },
                    },
                    error: {},
                    focused: {
                        transform: 'translate(0, -1.5px) scale(0.9)',
                        color: theme.palette.secondary.light,
                    },
                    shrink: {
                        transform: 'translate(0, 1.5px) scale(0.9)',
                        color: theme.palette.secondary.light,
                        fontWeight: 300,
                    },
                },
            }}
            InputProps={{
                sx: {
                    formControl: {
                        'label + &': {
                            marginTop: 200,
                        },
                    },
                },
            }}
        />
    );
};

export default TextInputWithTopLabel;
