import { useTheme } from '@mui/material';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export function LineCharts({ data }: any) {
    const theme = useTheme();
    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <LineChart
                data={data}
                width={500}
                height={300}
                margin={{
                    top: 10,
                    right: 30,
                    left: 30,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    padding={{ left: 30, right: 30 }}
                />
                <YAxis orientation={'right'} />
                <Tooltip />
                <Legend />

                <Line
                    type="linear"
                    dataKey="gains"
                    stroke={'#4CE49D'}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="linear"
                    dataKey="visits"
                    strokeWidth={2}
                    stroke={theme.palette.secondary.main}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
