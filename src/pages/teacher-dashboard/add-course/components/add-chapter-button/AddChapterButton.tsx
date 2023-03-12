import { AddCircle } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';

interface AddChapterButtonProps {
    setChapters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function AddChapterButton({ setChapters, }: AddChapterButtonProps) {
    const theme = useTheme();
    return (<Box onClick={() => {
        setChapters((chaps: any) => {
            let f = [...chaps];
            f.push(uuidv4());
            return f;
        });
    }} gap={2} sx={{
        cursor: 'pointer',
        display: 'flex',
        bgcolor: 'purple.light',
        opacity: .71,
        borderRadius: theme.spacing(),
        px: 6,
        pl: 5,
        py: 4
    }}>
        <Box display="flex" flexDirection={'column'} color={'white'} flexGrow={'1'}>
            <Typography>
                اضف فصل جديد
            </Typography>
            <Typography variant={'caption'}>
                انقر هنا لإضافة فصل جديد الى الكورس
            </Typography>
        </Box>
        <IconButton>
            <AddCircle sx={{
                color: 'white',
                width: theme.spacing(4),
                height: 'auto'
            }} />
        </IconButton>
    </Box>);
}
