import { Card, Popper, useTheme } from '@mui/material';

interface props {
    isOpen: boolean;
    cardRef: any;
    children?: React.ReactNode;
}
export function FilterPopper({ isOpen, cardRef, children }: props) {
    const theme = useTheme();
    return (
        <Popper
            open={isOpen}
            anchorEl={cardRef.current}
            placement="bottom"
            sx={{
                width: cardRef.current?.getBoundingClientRect().width,
                direction: 'ltr',
            }}
        >
            <Card
                elevation={0}
                sx={{
                    height: '100%',
                    bgcolor: 'white',
                    my: 2,
                    borderRadius: theme.spacing(2),
                    px: 2,
                    py: 3,
                    direction: 'ltr',
                    boxShadow: '0 5px 10px #0000001A',
                }}
            >
                {/*levels*/}
                {children}
            </Card>
        </Popper>
    );
}
