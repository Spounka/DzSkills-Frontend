import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { StyledOutline } from '../../../../../components/form/StyledOutline';
import { Chapter as CourseChap } from '../../../../../types/course';

interface props {
    index: number;
    chapter: Chapter | CourseChapter;
    setChapter: (c: Chapter | CourseChapter) => void;
    readonly?: boolean;
}

export function ChapterFields({ index, chapter, readonly, setChapter }: props) {
    function handleChapterTitleChange(e: any) {
        setChapter({
            title: e.target.value,
            description: chapter.description,
        });
    }
    function handleChapterDescriptionChange(e: any) {
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
                placeholder={chapter.title}
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
                    <Typography
                        variant={'subtitle2'}
                        px={1}
                    >
                        وصف
                    </Typography>
                    <StyledOutline
                        required
                        readOnly={readonly}
                        placeholder={chapter.description || ''}
                        onBlur={readonly ? () => {} : handleChapterDescriptionChange}
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
