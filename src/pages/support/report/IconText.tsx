import { Box, Typography } from '@mui/material';

export function IconText({ Icon, text }: any) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
            }}
        >
            <Icon
                className={'hidden sm:block'}
                style={{
                    marginLeft: 2,
                    marginRight: 2,
                }}
            />
            <Typography
                variant={'subtitle1'}
                fontWeight={300}
                sx={{
                    direction: 'ltr',
                }}
            >
                {text}
            </Typography>
        </Box>
    );
}
