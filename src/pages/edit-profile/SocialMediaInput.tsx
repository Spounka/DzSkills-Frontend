import { OutlinedInput, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';


export default function SocialMediaInput({ name, text, placeholder }: any) {
    const theme = useTheme();
    return <Box sx={{
        bgcolor: theme.palette.gray.main,
        borderRadius: theme.spacing(),
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
    }}>
        <Typography color={'white'} variant={'h6'} sx={{
            flexBasis: '2/3',
            flexGrow: '1',
        }}>
            {text}
        </Typography>
        <OutlinedInput
            type={'text'}
            name={name}
            placeholder={placeholder}
            dir={'ltr'}
            color={'secondary'}
            sx={{
                flexGrow: '1',
                flexBasis: '1/3',
                bgcolor: 'white',
                borderRadius: theme.spacing(),
            }} />
    </Box>;
}
