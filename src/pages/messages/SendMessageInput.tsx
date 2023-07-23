import { Send } from '@mui/icons-material';
import { IconButton, OutlinedInput, Stack, useTheme } from '@mui/material';
import { FormEvent, KeyboardEvent } from 'react';
import { MessageAddFile } from './MessageAddFile';

interface inputProps {
    onSubmit: (
        e:
            | FormEvent<HTMLFormElement>
            | KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
    inputRef: any;
    appendFile: (file: { file: File; uuid?: string }) => void;
    enabled?: boolean;
}
export function SendMessageInput({
    enabled,
    onSubmit,
    inputRef,
    appendFile,
}: inputProps) {
    const theme = useTheme();
    return (
        <OutlinedInput
            multiline
            required
            disabled={!enabled}
            maxRows={5}
            onKeyDown={event => {
                if (event.shiftKey && event.key === 'Enter') {
                    event.preventDefault();
                    onSubmit(event);
                }
            }}
            color={'secondary'}
            inputRef={inputRef}
            inputProps={{
                name: 'content',
            }}
            name="content"
            sx={{
                px: 2,
                width: '100%',
                flexGrow: '1',
                direction: 'rtl',
                '&.Mui-disabled': {
                    bgcolor: theme.palette.gray.light,
                },
            }}
            startAdornment={
                <Stack
                    direction={'row'}
                    gap={2}
                >
                    <IconButton
                        color="secondary"
                        type="submit"
                        disabled={!enabled}
                    >
                        <Send fill={'blue'} />
                    </IconButton>
                    <MessageAddFile
                        enabled={enabled}
                        appendFile={appendFile}
                    />
                </Stack>
            }
        />
    );
}
