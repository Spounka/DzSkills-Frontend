import {
    Box, SxProps, Typography,
    useTheme
} from '@mui/material';
import { ReactComponent as UploadImage } from '../../../../../assets/svg/Download.svg';
import { fileNameFromPath } from '../../../../../globals/utils';

export function FileUrlField({ url, sx }: { url: string; sx?: SxProps; }) {
    const theme = useTheme();

    return (
        <Box
            component={'a'}
            download
            href={url}
            sx={{
                border: '1px solid #CCC',
                padding: 1,
                display: 'flex',
                gap: 2,
                p: theme.spacing(3),
                borderRadius: theme.spacing(),
                overflow: 'hidden',
                px: 3,
                ...sx,
            }}
        >
            <UploadImage
                style={{
                    height: theme.spacing(8),
                    width: theme.spacing(8),
                    fill: theme.palette.gray.light,
                }} />

            <Box
                flexGrow={'1'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
            >
                <Typography
                    color={'gray.dark'}
                    variant={'caption'}
                >
                    إضغط هنا للتحميل
                </Typography>
                <Typography
                    maxWidth={'250px'}
                    noWrap
                    color={'gray.main'}
                    variant={'subtitle2'}
                    fontWeight={400}
                >
                    {fileNameFromPath(url)}
                </Typography>
            </Box>
        </Box>
    );
}

