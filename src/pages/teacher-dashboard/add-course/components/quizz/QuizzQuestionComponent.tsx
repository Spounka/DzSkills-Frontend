import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as AddButtonBlue } from '../../../../../assets/svg/add-button-blue.svg';
import { StyledOutline } from '../../../../../components/form/StyledOutline';
import { QuizzChoice, QuizzQuestion } from '../../../../../types/quizz';
import { QuizzAccordion } from './QuizzAccordion';
import { QuizzChoiceComponent } from './QuizzChoiceComponent';

interface QuizzQuestionProps {
    question: QuizzQuestion;
    updateQuizz: (question: QuizzQuestion) => void;
}
export function QuizzQuestionComponent({ question, updateQuizz }: QuizzQuestionProps) {
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [localQuestion, setLocalQuestion] = React.useState<
        QuizzQuestion | undefined
    >();

    useEffect(() => setLocalQuestion(question), []);

    useEffect(() => {
        if (localQuestion) updateQuizz(localQuestion);
    }, [localQuestion]);

    const updateQuestion = (choice: QuizzChoice) => {
        const q = { ...localQuestion };

        if (q.choices) {
            let index = q.choices.findIndex(x => x.key === choice.key);
            if (index >= 0) q.choices[index] = { ...choice };
            else q.choices = [...q.choices, choice];
        } else {
            q.choices = [choice];
        }
        setLocalQuestion(q);
    };

    const appendChoice = () => {
        setLocalQuestion(q => {
            if (q?.choices)
                return {
                    ...q,
                    choices: [
                        ...q.choices,
                        { key: uuidv4(), content: 'الاختيار', is_correct_answer: false },
                    ],
                };
            return {
                ...q,
                choices: [
                    { key: uuidv4(), content: 'الاختيار', is_correct_answer: false },
                ],
            };
        });
    };

    const removeChoice = (c: QuizzChoice) => {
        if (localQuestion?.choices?.length === 1) return;
        const q = { ...localQuestion };
        const result = q.choices?.filter(choice => choice.key !== c.key);
        if (result) setLocalQuestion({ ...q, choices: result });
    };

    const updateQuestionCallback = useCallback(updateQuestion, [localQuestion]);
    const appendChoiceCallback = useCallback(appendChoice, [localQuestion]);
    const removeChoiceCallback = useCallback(removeChoice, [localQuestion]);

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100px',
                bgcolor: '#323287',
                borderRadius: theme.spacing(),
                p: 3,
            }}
        >
            <QuizzAccordion
                expanded={expanded}
                setExpanded={setExpanded}
                titleContent={question.content}
            >
                <StyledOutline
                    onBlur={e => {
                        setLocalQuestion(q => {
                            return { ...q, content: e.currentTarget.value };
                        });
                    }}
                    multiline
                    color={'secondary'}
                    placeholder={question.content}
                    sx={{
                        bgcolor: 'white',
                        width: '100%',
                    }}
                />
                <Typography>خيارات الإجابة</Typography>
                <Grid
                    container
                    columns={2}
                    spacing={2}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {question.choices?.map(c => {
                        return (
                            <Grid
                                item
                                xs={1}
                                key={c.key}
                                width={'100%'}
                                flex={'1 1 50%'}
                            >
                                <QuizzChoiceComponent
                                    key={c.key}
                                    choice={c}
                                    updateQuestion={updateQuestionCallback}
                                    removeChoice={removeChoiceCallback}
                                />
                            </Grid>
                        );
                    })}
                    <Grid
                        item
                        xs={2}
                        textAlign={'center'}
                    >
                        <IconButton
                            sx={{ placeSelf: 'center', justifySelf: 'center' }}
                            onClick={appendChoiceCallback}
                        >
                            <AddButtonBlue />
                        </IconButton>
                    </Grid>
                </Grid>
            </QuizzAccordion>
        </Box>
    );
}
