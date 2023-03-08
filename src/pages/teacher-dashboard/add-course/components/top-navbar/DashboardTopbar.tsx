import { Avatar, OutlinedInput, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Box, useTheme } from '@mui/system';
import { MainButton } from '../../../../../components/ui/MainButton';
import purpleNotification from '../../../../../assets/svg/notification purple.svg';

export function DashboardTopbar({ }) {
    const theme = useTheme();
    return (<Card elevation={0} sx={{
        px: theme.spacing(3),
        display: 'grid',
        gap: theme.spacing(),
        gridTemplateColumns: 'repeat(26, 1fr)',
        alignItems: 'center',
        boxShadow: '7px 20px 40px #00000014',
        borderRadius: theme.spacing(),
        gridColumn: '1 / -3',
        gridRow: 'span 2',
        py: '1rem',
    }}>
        <Box gridColumn={'span 6'}>
            <Typography variant={'h6'} fontWeight={600} color={'purple.main'}>
                اضف كورس جديد
            </Typography>
            <Typography variant={'caption'} fontWeight={300} color={'gray.main'}>
                كلها في مكـــــان واحد لك
            </Typography>
        </Box>
        <OutlinedInput placeholder={'ابحث عن الدورة المناسبة لك'}
            sx={{
                gridColumn: '11 / -5',
                borderRadius: theme.spacing(),
                pr: theme.spacing(2),
                pl: theme.spacing(),
                py: theme.spacing(.5),
                maxHeight: theme.spacing(6),
                color: 'gray.main',
                fontWeight: 400,
                // @ts-ignore
                fontSize: theme.typography.subtitle2
            }}
            endAdornment={<MainButton text={'بحث'} color={theme.palette.purple.main}
                sx={{
                    height: theme.spacing(4),
                    width: 'auto'
                }} />} />
        <img src={purpleNotification} alt="" style={{
            gridColumn: '-3',
        }} />
        <Avatar sx={{
            gridColumn: '-1',
        }} />

    </Card>
    );
}
