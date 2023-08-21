import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function IconFormPassword({ placeholder, ...other }: any) {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <OutlinedInput
            fullWidth
            color="secondary"
            id={`outlined-adornment-password-${uuidv4()}`}
            placeholder={placeholder}
            type={showPassword ? 'text' : 'password'}
            {...other}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
    );
}

export default IconFormPassword;
