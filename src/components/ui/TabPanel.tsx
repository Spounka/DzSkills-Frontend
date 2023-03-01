import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export interface TabPanelProps {
    children?: React.ReactNode,
    index: number,
    value: number
};
export function TabPanel({ children, index, value, ...other }: TabPanelProps) {
    return (
        <div role="tabpanel"
            hidden={index !== value}
            id={`tabl-panel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index &&
                <Box sx={{
                    // px: 6,
                    // py: 8
                }}>
                    <Typography>{children}</Typography>
                </Box>}
        </div>
    );
}
