import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import { SettingsSectionHeader } from './SettingsSectionHeader';

interface SettingsSectionProps {
    title: string;
    children?: ReactNode;
}
export function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <Stack gap={3}>
            <SettingsSectionHeader title={title} />
            {children}
        </Stack>
    );
}
