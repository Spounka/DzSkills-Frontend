import { Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as AddButtonBlue } from '../../../../../assets/svg/add-button-blue.svg';
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/delete-red.svg';
import { StyledOutline } from '../../../../../components/form/StyledOutline';
import { QuizzChoice, QuizzQuestion } from '../../../../../types/quizz';
import { QuizzAccordion } from './QuizzAccordion';
import { QuizzChoiceComponent } from './QuizzChoiceComponent';

interface QuizzQuestionProps {
    question: QuizzQuestion;
    readonly?: boolean;
    color?: string;
    stringColor?: string;
    updateQuizz: (question: QuizzQuestion) => void;
    removeQuestion: (uuid?: string | number) => void;
}
export function QuizzQuestionComponent({
    question,
    color,
    readonly,
    stringColor,
    updateQuizz,
    removeQuestion,
}: QuizzQuestionProps) {
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
            const index = q.choices.findIndex(x => {
                if (choice.key) return x.key === choice.key;
                return x.id === choice.id;
            });
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
        // prevents from having 0 answers
        if (localQuestion?.choices?.length === 1) return;
        const q = { ...localQuestion };
        const result = q.choices?.filter(choice => {
            if (c.key) return choice.key !== c.key;
            return choice.id !== c.id;
        });
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
                bgcolor: color ?? '#323287',
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
                    readOnly={readonly}
                    onBlur={
                        readonly
                            ? () => {}
                            : e => {
                                  setLocalQuestion(q => {
                                      return { ...q, content: e.currentTarget.value };
                                  });
                              }
                    }
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
                                    color={stringColor}
                                    key={c.id}
                                    choice={c}
                                    readonly={readonly}
                                    updateQuestion={updateQuestionCallback}
                                    removeChoice={removeChoiceCallback}
                                />
                            </Grid>
                        );
                    })}
                    {!readonly && (
                        <Grid
                            item
                            xs={8}
                        >
                            <Stack
                                textAlign={'center'}
                                justifyContent={'center'}
                                gap={8}
                                direction={'row'}
                            >
                                <IconButton
                                    sx={{ placeSelf: 'center', justifySelf: 'center' }}
                                    onClick={appendChoiceCallback}
                                >
                                    <AddButtonBlue />
                                </IconButton>
                                <IconButton
                                    sx={{ placeSelf: 'center', justifySelf: 'center' }}
                                    onClick={() => {
                                        if (question.key) removeQuestion(question.key);
                                        else removeQuestion(question.id ?? 0);
                                    }}
                                >
                                    <DeleteIcon fill={'white'} />
                                </IconButton>
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            </QuizzAccordion>
        </Box>
    );
}
