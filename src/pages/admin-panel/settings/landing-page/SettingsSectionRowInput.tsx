import { OutlinedInput, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface SettingsSectionRowInputProps {
    inputLabel: string;
    titleInputName: string;
    multiline?: boolean;
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
}

export function SettingsSectionRowInput({
    inputLabel,
    titleInputName,
    multiline,
    defaultValue,
    placeholder,
    required,
}: SettingsSectionRowInputProps) {
    const [currentValue, setCurrentValue] = useState<string>(defaultValue ?? '');

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCurrentValue(event.target.value);
    };

    useEffect(() => setCurrentValue(defaultValue ?? ''), [defaultValue]);

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
                placeholder={placeholder ?? ''}
                onChange={handleChange}
                color={'secondary'}
                multiline={multiline}
                rows={multiline ? 3 : 1}
                required={required}
            />
        </Stack>
    );
}
