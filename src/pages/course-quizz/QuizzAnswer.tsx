import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { Checkbox, Stack } from '@mui/material';
import { StyledOutline } from '../../components/form/StyledOutline';
import { QuizzChoice } from '../../types/quizz';

export function QuizzAnswer({ choice }: { choice: QuizzChoice }) {
    return (
        <Stack
            direction="row"
            flex={'1 0 50%'}
            width={'100%'}
            gap={1}
        >
            <Checkbox
                color={'primary'}
                icon={
                    <CheckBoxOutlineBlank
                        fill={'white'}
                        sx={{
                            fill: 'white',
                        }}
                    />
                }
                sx={{
                    '& root': {
                        outlineColor: 'white',
                        fill: 'white',
                    },
                }}
            />
            <StyledOutline
                readOnly
                color={'secondary'}
                value={choice.content}
                sx={{
                    bgcolor: 'white',
                    width: '100%',
                }}
            />
        </Stack>
    );
}
