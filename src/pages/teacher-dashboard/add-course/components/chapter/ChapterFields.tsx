import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { StyledOutline } from '../../../../../components/form/StyledOutline';
import { CreationChapter } from '../../../../../types/course';

interface props {
    index: number;
    chapter: CreationChapter;
    setChapter: (c: CreationChapter) => void;
    readonly?: boolean;
}

export function ChapterFields({ index, chapter, readonly, setChapter }: props) {
    const { enqueueSnackbar } = useSnackbar();
    function handleChapterTitleChange(e: any) {
        if (e.target.value > 300) {
            enqueueSnackbar('300 كلمة كحد أقصى', { variant: 'warning' });
            e.target.value = '';
        }
        setChapter({
            title: e.target.value,
            description: chapter.description,
        });
    }
    function handleChapterDescriptionChange(
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if (e.target.value.length > 300) {
            enqueueSnackbar('300 كلمة كحد أقصى', { variant: 'warning' });
            e.currentTarget.value = e.currentTarget.value.slice(0, 300);
        }
        setChapter({ description: e.target.value, title: chapter.title });
    }
    return (
        <>
            <Typography
                variant={'subtitle2'}
                px={1}
            >
                عنوان الفصل
            </Typography>

            <StyledOutline
                readOnly={readonly}
                defaultValue={chapter.title}
                name={`chapters[${index}]title`}
                type="text"
                color={'secondary'}
                required
                onBlur={handleChapterTitleChange}
                sx={{
                    bgcolor: 'white',
                    flexGrow: '1',
                    width: '100%',
                }}
            />
            <Box
                gap={1.5}
                sx={{
                    flexGrow: '1',
                    display: 'flex',
                    width: '100%',
                }}
            >
                <Box
                    flexGrow={'1'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={2}
                >
                    <input
                        hidden
                        name={`chapters[${index}]id`}
                        value={chapter.id ?? 0}
                    />
                    <Typography
                        variant={'subtitle2'}
                        px={1}
                    >
                        وصف
                    </Typography>
                    <StyledOutline
                        required
                        readOnly={readonly}
                        defaultValue={chapter.description ?? ''}
                        onBlur={handleChapterDescriptionChange}
                        name={`chapters[${index}]description`}
                        color="secondary"
                        multiline
                        rows={5}
                        sx={{
                            bgcolor: 'white',
                            height: '100%',
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}
