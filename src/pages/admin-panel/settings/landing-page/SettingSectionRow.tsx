import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface SettingsSectionRowProps {
    children?: ReactNode;
}
export function SettingSectionRow({ children }: SettingsSectionRowProps) {
    return (
        <Stack
            direction="row"
            gap={20}
        >
            {children}
        </Stack>
    );
}
