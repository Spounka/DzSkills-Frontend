import { Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { TabPanel } from './TabPanel';


interface props {
    tabs: React.ReactElement[];
    panels: React.ReactElement[];
    startState?: number
}

function FullWidthTab({ tabs, panels, startState }: props) {
    const [value, setValue] = React.useState(startState || 0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{
            }} >
                <Tabs variant='fullWidth' indicatorColor='primary' textColor='inherit'
                    value={value} onChange={handleChange} aria-label="authentication tabs"
                    TabIndicatorProps={{
                        style: {
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: '0.5rem 0.5rem 0 0',
                            zIndex: 0,
                        }
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
                    {tabs.map((tab) => tab)}
                </Tabs>
            </Box>
            {panels.map((panel, index) => {
                return (
                    <TabPanel value={value} index={index} key={index}>
                        {panel}
                    </TabPanel>
                )
            })}
        </Box>
    );
}

export default FullWidthTab