import { Send } from '@mui/icons-material';
import { IconButton, OutlinedInput, Stack } from '@mui/material';
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
}
export function SendMessageInput({ onSubmit, inputRef, appendFile }: inputProps) {
    return (
        <OutlinedInput
            multiline
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
            }}
            startAdornment={
                <Stack
                    direction={'row'}
                    gap={2}
                >
                    <IconButton
                        color="secondary"
                        type="submit"
                    >
                        <Send fill={'blue'} />
                    </IconButton>
                    <MessageAddFile appendFile={appendFile} />
                </Stack>
            }
        />
    );
}
