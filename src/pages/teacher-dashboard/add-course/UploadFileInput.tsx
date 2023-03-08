import { Button, Typography } from '@mui/material';
import { Box, SxProps, useTheme } from '@mui/system';

interface UploadFileInputProps {
    inputName: string;
    uploadImg: string;
    sx?: SxProps;
    buttonSx?: SxProps;
    inputFileTypes?: string;
    multipleFiles?: boolean;
    containerSx?: SxProps;
    required?: boolean
}
export function UploadFileInput({ inputName, uploadImg, sx, buttonSx, multipleFiles, inputFileTypes, required, containerSx }: UploadFileInputProps) {
    const theme = useTheme();
    return (
        <Box sx={{
            border: '1px solid #CCC',
            padding: 1,
            display: 'flex',
            gap: 2,
            p: theme.spacing(3),
            borderRadius: theme.spacing(),
            ...sx
        }}>
            <Button variant='contained' component={"label"} sx={{
                color: 'black',
                bgcolor: 'gray.secondary',
                borderRadius: "100%",
                width: 'auto',
                height: '100%',
                aspectRatio: '1/1',
                '&:hover': {
                    bgcolor: 'gray.secondary'
                },
                ...buttonSx
            }}>
                <img src={uploadImg} />
                <input
                    hidden
                    name={inputName}
                    accept={inputFileTypes || "*"}
                    multiple={multipleFiles || false}
                    type='file'
                    required={required || false}
                />
            </Button>
            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                sx={{
                    ...containerSx
                }}
            >
                <Typography color={'gray.dark'} variant={'caption'}>
                    اسحب الملفات إلى هنا
                </Typography>
                <Typography color={'gray.main'} variant={'caption'} fontWeight={300}>
                    أو انقر للاختيار يدويا
                </Typography>
            </Box>
        </Box>
    );
}
