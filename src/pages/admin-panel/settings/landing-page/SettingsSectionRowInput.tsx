import { OutlinedInput, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';

interface SettingsSectionRowInputProps {
    inputTitle: string;
    titleInputName: string;
    multiline?: boolean;
    defaultValue?: string;
}

export function SettingsSectionRowInput({
    inputTitle,
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
                {inputTitle}
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
