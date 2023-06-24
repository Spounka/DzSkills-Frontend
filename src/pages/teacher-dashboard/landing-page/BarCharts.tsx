import { useTheme } from '@mui/material';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export function BarCharts({ data }: any) {
    const theme = useTheme();
    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <BarChart
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

                <Bar
                    type="linear"
                    dataKey="gains"
                    fill={'#4CE49D'}
                />
                <Bar
                    type="linear"
                    dataKey="visits"
                    fill={theme.palette.secondary.main}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
