import { Card, Popover, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface AddItemPopupProps {
    isOpen: boolean;
    closeDialog: () => void;
    root: HTMLElement;
    width: number;
    children?: ReactNode;
}
function AddItemPopup({
    isOpen,
    root,
    width,
    children,
    closeDialog,
}: AddItemPopupProps) {
    const theme = useTheme();
    return (
        <Popover
            open={isOpen}
            onClose={closeDialog}
            anchorEl={root}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
            <Card
                elevation={0}
                sx={{
                    width: width,
                    minWidth: '200px',
                    p: 2,
                }}
            >
                {children}
            </Card>
        </Popover>
    );
}

AddItemPopup.prototype = {
    isOpen: false,
};

export default AddItemPopup;
