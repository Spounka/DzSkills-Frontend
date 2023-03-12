import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { StyledOutline } from '../../../components/form/StyledOutline';
import { UploadFileInput } from '../../../components/form/UploadFileInput';

export function ChapterFields({ index, chapter, setChapter }: any) {
    function handleChapterTitleChange(e: any) {
        setChapter({ title: e.target.value, description: chapter.description })
    }
    function handleChapterDescriptionChange(e: any) {
        setChapter({ description: e.target.value, title: chapter.title })
    }
    return (
        <>
            <Typography variant={'subtitle2'} px={1}>
                عنوان الفصل
            </Typography>

            <StyledOutline
                name={`chapters[${index}]title`}
                type="text"
                color={'secondary'}
                required
                onBlur={handleChapterTitleChange}
                sx={{
                    bgcolor: 'white',
                    flexGrow: '1',
                    width: '100%'
                }} />
            <Box gap={1.5} sx={{
                flexGrow: '1',
                display: 'flex',
                width: '100%'
            }}>
                <Box flexGrow={'1'} width={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
                    <Typography
                        variant={'subtitle2'}
                        px={1}>
                        وصف
                    </Typography>
                    <StyledOutline
                        required
                        onBlur={handleChapterDescriptionChange}
                        name={`chapters[${index}]description`}
                        color='secondary' multiline rows={5} sx={{
                            bgcolor: 'white',
                            height: '100%'
                        }} />
                </Box>
                <Box flexGrow={'1'} width={'100%'} display={'flex'} flexDirection={'column'} gap={2}>
                    <Typography variant={'subtitle2'} px={1}>
                        صورة مصغرة
                    </Typography>
                    <UploadFileInput
                        inputName={`chapters[${index}]thumbnail`}
                        sx={{
                            alignItems: 'center',
                            flexDirection: 'column',
                            height: '100%',
                            bgcolor: 'white',
                            justifyContent: 'center'
                        }}
                        containerSx={{
                            alignItems: 'center',
                            flexGrow: '0'
                        }}
                        inputFileTypes='image/*' />
                </Box>
            </Box>
        </>
    );
}
