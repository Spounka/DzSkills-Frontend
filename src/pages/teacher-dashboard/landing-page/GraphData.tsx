import { BarChart as BarChartIcon, ShowChart } from '@mui/icons-material';
import { Box, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useRef, useState } from 'react';
import { StyledCard } from '../../../components/StyledCard';
import { BarCharts } from './BarCharts';
import { LineCharts } from './LineCharts';

export function GraphData({ data, color }: any) {
    const theme = useTheme();
    const containerRef = useRef(null);
    const [currentGraph, setCurrentGraph] = useState<number>(0);
    return (
        <StyledCard ref={containerRef}>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                color={'inherit'}
            >
                <Typography
                    variant={'h6'}
                    color={color || 'purple.main'}
                >
                    الأرباح
                </Typography>
                <IconButton onClick={() => setCurrentGraph(o => (o + 1) % 2)}>
                    {currentGraph === 0 ? <BarChartIcon /> : <ShowChart />}
                </IconButton>
            </Stack>
            <Divider />
            <Box
                sx={{
                    direction: 'ltr',
                }} //@ts-expect-error
                width={containerRef.current?.clientWidth - theme.spacing(2)}
                height={'50vh'}
            >
                {currentGraph === 1 ? (
                    <BarCharts data={data} />
                ) : (
                    <LineCharts data={data} />
                )}
            </Box>
        </StyledCard>
    );
}
