import { Button, Typography } from '@mui/material';
import { Box, SxProps, useTheme } from '@mui/system';
import { useState } from 'react';
import uploadImg from '../../assets/svg/upload gray.svg';

interface UploadFileInputProps {
    inputName: string;
    sx?: SxProps;
    buttonSx?: SxProps;
    inputFileTypes?: string;
    multipleFiles?: boolean;
    containerSx?: SxProps;
    onChange?: any
    defaultFile?: any
    required?: any
}
export function UploadFileInput({
    defaultFile,
    inputName,
    sx,
    buttonSx,
    multipleFiles,
    inputFileTypes,
    containerSx,
    onChange,
    required,
}: UploadFileInputProps) {
    const theme = useTheme();
    const [currentFile, setCurrentFile] = useState<File>()

    function handleFileChange(e: any) {
        setCurrentFile(e.target.files[0]);
        if (onChange)
            onChange(e)
    }

    return (
        <Box sx={{
            border: '1px solid #CCC',
            padding: 1,
            display: 'flex',
            gap: 2,
            p: theme.spacing(3),
            borderRadius: theme.spacing(),
            overflow: 'hidden',
            px: 3,
            ...sx
        }}>
            <Button
                disableRipple
                variant='contained'
                component={"label"} sx={{
                    color: 'black',
                    bgcolor: 'gray.secondary',
                    borderRadius: "100%",
                    width: 'auto',
                    height: 'auto',
                    aspectRatio: '1',
                    boxShadow: 'none',
                    '&:hover': {
                        bgcolor: 'gray.secondary',
                        boxShadow: 'none',
                    },
                    ...buttonSx
                }}>
                <img src={uploadImg} />
                <input
                    // hidden
                    style={{
                        width: 1,
                        height: 1,
                    }}
                    required={required}
                    onChange={handleFileChange}
                    placeholder={defaultFile}
                    name={inputName}
                    accept={inputFileTypes || "*"}
                    multiple={multipleFiles || false}
                    type='file'
                />
            </Button>
            <Box
                flexGrow={'1'}
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
                {currentFile &&
                    <Typography maxWidth={'250px'} noWrap color={'gray.main'} variant={'subtitle2'} fontWeight={400}>
                        {currentFile.name}
                    </Typography>
                }
            </Box>
        </Box >
    );
}
