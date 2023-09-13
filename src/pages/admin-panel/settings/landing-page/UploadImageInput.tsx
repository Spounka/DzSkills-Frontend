import { FileUpload } from '@mui/icons-material';
import { Box, IconButton, Stack, useTheme } from '@mui/material';
import Image from 'mui-image';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
interface props {
    src: string;
    name: string;
    required?: boolean;
    maxSize?: number;
    onUpdate?: (src: any) => void;
}
export function UploadImageInput({ src, name, required, maxSize, onUpdate }: props) {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();

    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('');
    function onSectionImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputElement = e.target;
        let files: FileList | null = inputElement.files;
        if (files) {
            const exp = /(image\/*)/i;
            if (files.item(0) && !RegExp(exp).exec(files.item(0)?.type ?? '')) {
                enqueueSnackbar('الرجاء تحميل صورة', { variant: 'error' });
                e.target.value = '';
                return;
            }
            const size = maxSize ?? 1024 * 1024 * 15;
            if (files.item(0) && (files.item(0)?.size ?? 0) > size) {
                const size_unit_text: string =
                    size > 1024
                        ? size > 1024 * 1024
                            ? 'ميجابايت'
                            : 'كيلوبايت'
                        : 'بايت';
                const size_text = `${(size % 1024) % 1024} ${size_unit_text}`;
                enqueueSnackbar(`لا يمكن أن يتجاوز حجم الصورة ${size_text}`, {
                    variant: 'error',
                });
                e.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                if (onUpdate) onUpdate(reader.result);
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
            {imageSrc ? (
                <Image
                    src={imageSrc?.toString() ?? src}
                    errorIcon={false}
                    fit="contain"
                    style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1',
                    }}
                />
            ) : (
                <Box
                    sx={{
                        height: 'auto',
                        aspectRatio: '1',
                        flex: '1',
                    }}
                ></Box>
            )}
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
                    required={required}
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
