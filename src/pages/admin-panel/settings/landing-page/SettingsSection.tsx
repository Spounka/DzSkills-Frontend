import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import { SettingsSectionHeader } from './SettingsSectionHeader';

interface SettingsSectionProps {
    title: string;
    direction?: 'column' | 'row' | 'row-reverse' | 'column-reverse';
    children?: ReactNode;
}
export function SettingsSection({ title, direction, children }: SettingsSectionProps) {
    return (
        <Stack
            gap={3}
            direction={direction || 'column'}
        >
            <SettingsSectionHeader title={title} />
            {children}
        </Stack>
    );
}
