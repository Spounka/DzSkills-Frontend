import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { Checkbox, IconButton, Stack, SvgIcon } from '@mui/material';
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/delete-white.svg';
import { StyledOutline } from '../../../../../components/form/StyledOutline';
import { QuizzChoice } from '../../../../../types/quizz';

interface QuizzChoiceProps {
    choice: QuizzChoice;
    color?: string;
    updateQuestion: (c: QuizzChoice) => void;
    removeChoice: (c: QuizzChoice) => void;
}
export function QuizzChoiceComponent({
    choice,
    color,
    updateQuestion,
    removeChoice,
}: QuizzChoiceProps) {
    return (
        <Stack
            direction="row"
            flex={'1 0 50%'}
            width={'100%'}
            gap={1}
        >
            <Checkbox
                checked={choice.is_correct_answer}
                //@ts-expect-error
                color={color || 'purple'}
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
                onChange={e => {
                    updateQuestion({
                        ...choice,
                        is_correct_answer: e.target.checked,
                    });
                }}
            />
            <StyledOutline
                color={'secondary'}
                placeholder={choice.content}
                onBlur={e => {
                    updateQuestion({ ...choice, content: e.currentTarget.value });
                }}
                sx={{
                    bgcolor: 'white',
                    width: '100%',
                }}
            />

            <IconButton
                onClick={() => {
                    removeChoice(choice);
                }}
                sx={{
                    color: 'white',
                    transition: 'color 100ms ease-in',
                    ':hover': {
                        color: 'red',
                    },
                }}
            >
                <SvgIcon
                    component={DeleteIcon}
                    inheritViewBox
                />
            </IconButton>
        </Stack>
    );
}
