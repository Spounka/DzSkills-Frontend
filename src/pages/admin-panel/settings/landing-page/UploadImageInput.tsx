import { FileUpload } from '@mui/icons-material';
import { Button, Stack, useTheme } from '@mui/material';
import Image from 'mui-image';
import { useState } from 'react';
interface props {
    src: string;
    name: string;
}
export function UploadImageInput({ src, name }: props) {
    const theme = useTheme();

    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('');
    function onSectionImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputElement = e.target;
        let files: FileList | null = inputElement.files;
        if (files) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(files[0]);
        }
    }

    return (
        <Stack
            gap={2}
            alignItems={'center'}
            alignContent={'center'}
            sx={{
                aspectRatio: '1/1',
                width: '100%',
            }}
        >
            <Image
                src={imageSrc?.toString() || src}
                fit="contain"
                style={{
                    height: 'auto',
                    aspectRatio: '1',
                }}
            />
            <Button
                variant={'outlined'}
                disableRipple
                component="label"
                sx={{
                    borderRadius: '50%',
                    // height: theme.spacing(6),
                    width: theme.spacing(),
                    aspectRatio: '1',
                    bgcolor: theme.palette.purple.main,
                    borderColor: theme.palette.purple.main,
                    borderWidth: '2px',
                    // p: 8,
                    '&:hover': {
                        bgcolor: 'white',
                        borderColor: theme.palette.purple.main,
                        borderWidth: '2px',

                        '.MuiButton-startIcon': {
                            color: theme.palette.purple.main,
                        },
                    },
                    '.MuiButton-startIcon': {
                        alignSelf: 'center',
                        justifySelf: 'center',
                        color: 'white',
                        m: 0,
                    },
                }}
                startIcon={
                    <FileUpload
                        sx={{
                            aspectRatio: '1',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                }
            >
                <input
                    type="file"
                    name={name}
                    accept="image/*,image/svg+xml"
                    onChange={onSectionImageChange}
                    style={{
                        width: 1,
                        height: 1,
                    }}
                />
            </Button>
        </Stack>
    );
}
