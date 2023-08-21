import { AddCircle } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import { CreationChapter } from '../../../../../types/course';

interface AddChapterButtonProps {
    bgcolor?: string;
    setChapters: React.Dispatch<React.SetStateAction<CreationChapter[]>>;
}

export function AddChapterButton({ bgcolor, setChapters }: AddChapterButtonProps) {
    const theme = useTheme();
    return (
        <Box
            onClick={() => {
                setChapters((chaps: CreationChapter[]) => {
                    return [...chaps, { uuid: uuidv4(), title: '', description: '' }];
                });
            }}
            gap={2}
            sx={{
                cursor: 'pointer',
                display: 'flex',
                bgcolor: bgcolor || 'purple.light',
                opacity: 0.71,
                borderRadius: theme.spacing(),
                px: 6,
                pl: 5,
                py: 4,
            }}
        >
            <Box
                display="flex"
                flexDirection={'column'}
                color={'white'}
                flexGrow={'1'}
            >
                <Typography>اضف فصل جديد</Typography>
                <Typography variant={'caption'}>
                    انقر هنا لإضافة فصل جديد الى الكورس
                </Typography>
            </Box>
            <IconButton>
                <AddCircle
                    sx={{
                        color: 'white',
                        width: theme.spacing(4),
                        height: 'auto',
                    }}
                />
            </IconButton>
        </Box>
    );
}
