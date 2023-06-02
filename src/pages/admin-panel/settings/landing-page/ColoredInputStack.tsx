import { Stack, Typography, useTheme } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { useState } from 'react';

export function ColoredInputStack({
    inputName,
    defaultValue,
}: {
    inputName: string;
    defaultValue?: string;
}) {
    const theme = useTheme();
    const [mainColor, setMainColor] = useState<string>(
        defaultValue || theme.palette.primary.main
    );
    const handleMainColorChange = (value: string) => {
        setMainColor(value);
    };
    return (
        <Stack
            gap={1}
        >
            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
                sx={{
                    gridColumn: 'span 1',
                    gridRow: '1',
                }}
            >
                الألوان
            </Typography>
            <MuiColorInput
                color="secondary"
                value={mainColor}
                onChange={handleMainColorChange}
                format="hex8"
                variant="outlined"
                name={inputName}
                sx={{
                    '&root': {
                        justifyItems: 'right',
                        justifyContent: 'flex-start',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                        px: 0,
                    },
                }}
            />
        </Stack>
    );
}
