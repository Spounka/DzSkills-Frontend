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
                <Box>
                    {children}
                </Box>}
        </div>
    );
}
