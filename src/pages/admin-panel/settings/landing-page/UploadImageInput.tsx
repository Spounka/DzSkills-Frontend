import { FileUpload } from '@mui/icons-material';
import { IconButton, Stack, useTheme } from '@mui/material';
import Image from 'mui-image';
import { useEffect, useState } from 'react';
interface props {
    src: string;
    name: string;
    onUpdate?: (src: any) => void;
}
export function UploadImageInput({ src, name, onUpdate }: props) {
    const theme = useTheme();

    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('');
    function onSectionImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputElement = e.target;
        let files: FileList | null = inputElement.files;
        if (files) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                if(onUpdate) onUpdate(reader.result);
            };
            reader.readAsDataURL(files[0]);
        }
    }

    useEffect(() => setImageSrc(src), [src]);

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
            <IconButton
                disableRipple
                component="label"
                sx={{
                    color: 'white',
                    maxWidth: theme.spacing(6),
                    maxHeight: theme.spacing(6),
                    // height: theme.spacing(6),
                    // width: theme.spacing(),
                    aspectRatio: '1',
                    bgcolor: theme.palette.purple.main,
                    borderColor: theme.palette.purple.main,
                    borderWidth: '2px',
                    transition: 'all 150ms ease-in-out',
                    // p: 2,
                    '&:hover': {
                        transition: 'all 150ms ease-in-out',
                        color: theme.palette.purple.main,
                        bgcolor: 'white',
                        borderColor: theme.palette.purple.main,
                        borderWidth: '2px',
                    },
                }}
            >
                <FileUpload
                    sx={{
                        aspectRatio: '1',
                        width: '100%',
                        height: '100%',
                    }}
                />
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
            </IconButton>
        </Stack>
    );
}
