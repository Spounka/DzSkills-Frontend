import { SxProps, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Image from 'mui-image';
import { useState } from 'react';

interface props {
    src: string;
    text: string;
    hoverImage?: string;
    sx?: SxProps;
}
function AnimatedIconButton({ src, text, hoverImage, sx }: props) {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <Button
            endIcon={
                <Image
                    src={hoverImage && isHovered ? hoverImage : src}
                    style={{
                        transition: 'all 80ms ease-in-out',
                    }}
                />
            }
            variant={'contained'}
            color="secondary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                boxShadow: '0 5px 10px #0000001A',
                borderColor: theme.palette.secondary.main,
                borderWidth: '1px',
                transition: 'all 100ms ease-in-out',
                bgcolor: 'white',
                flexGrow: '1',
                display: 'flex',
                justifyContent: 'center',
                color: isHovered ? 'white' : 'secondary.main',
                gap: 2,
                py: 1,
                borderRadius: theme.spacing(),
                ...sx,
            }}
        >
            <Typography
                sx={{
                    transition: 'all 100ms ease-in-out',
                    position: isHovered ? 'unset' : 'fixed',
                    visibility: isHovered ? 'visible' : 'hidden',
                }}
            >
                {text}
            </Typography>
        </Button>
    );
}

export default AnimatedIconButton;
