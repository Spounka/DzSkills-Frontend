import { Tab, Tabs } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TabPanel } from './TabPanel';

interface props {
    tabLabels: string[];
    panels: React.ReactElement[];
    startState?: number;
    sx?: SxProps;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function FullWidthTab({ tabLabels, panels, startState, sx }: props) {
    const [value, setValue] = React.useState(startState || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', height: '100%', ...sx }}>
            <Box sx={{}}>
                <Tabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="inherit"
                    value={value}
                    onChange={handleChange}
                    aria-label="authentication tabs"
                    TabIndicatorProps={{
                        style: {
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: '0.5rem 0.5rem 0 0',
                            zIndex: 0,
                        },
                    }}
                    sx={{
                        backgroundColor: 'gray.secondary',
                        minHeight: '3rem',
                        '& button': {
                            zIndex: 1,
                            py: 3,
                            height: '100%',
                            placeSelf: 'center',
                        },
                    }}
                >
                    {tabLabels.map((label, index) => {
                        return (
                            <Tab
                                disableRipple
                                label={label}
                                {...a11yProps(index)}
                                key={uuidv4()}
                            />
                        );
                    })}
                </Tabs>
            </Box>
            {panels.map((panel, index) => {
                return (
                    <TabPanel
                        value={value}
                        index={index}
                        key={uuidv4()}
                    >
                        {panel}
                    </TabPanel>
                );
            })}
        </Box>
    );
}

export default FullWidthTab;
