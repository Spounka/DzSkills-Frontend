import { Card, Popper, PopperPlacementType, useTheme } from '@mui/material';

interface props {
    isOpen: boolean;
    cardRef: any;
    children?: React.ReactNode;
    placement?: PopperPlacementType;
}
export function DropdownPopper({ isOpen, cardRef, placement, children }: props) {
    const theme = useTheme();
    return (
        <Popper
            open={isOpen}
            anchorEl={cardRef.current}
            placement={placement || 'bottom'}
            sx={{
                minWidth: cardRef.current?.getBoundingClientRect().width,
                maxWidth: '300px',
                direction: 'ltr',
                zIndex: 100,
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
