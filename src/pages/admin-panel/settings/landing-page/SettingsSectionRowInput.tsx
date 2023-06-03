import { OutlinedInput, Stack, Typography } from '@mui/material';
import { useState } from 'react';

interface SettingsSectionRowInputProps {
    inputLabel: string;
    titleInputName: string;
    multiline?: boolean;
    defaultValue?: string;
}

export function SettingsSectionRowInput({
    inputLabel,
    titleInputName,
    multiline,
    defaultValue,
}: SettingsSectionRowInputProps) {
    const [currentValue, setCurrentValue] = useState<string>(
        defaultValue || ''
    );

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCurrentValue(event.target.value);
    };

    return (
        <Stack
            flexBasis={'70%'}
            flexGrow={1}
            width={'100%'}
            gap={1}
        >
            <Typography
                variant={'subtitle2'}
                color={'gray.main'}
            >
                {inputLabel}
            </Typography>
            <OutlinedInput
                name={titleInputName}
                value={currentValue}
                onChange={handleChange}
                color={'secondary'}
                multiline={multiline}
                rows={multiline ? 3 : 1}
            />
        </Stack>
    );
}
