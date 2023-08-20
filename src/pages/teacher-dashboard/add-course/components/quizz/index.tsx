import { Divider, Stack, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MainButton } from '../../../../../components/ui/MainButton';
import { CourseQuizz, QuizzQuestion } from '../../../../../types/quizz';
import { QuizzQuestionComponent } from './QuizzQuestionComponent';

interface quizzProps {
    quizzData?: CourseQuizz;
    readonly?: boolean;
    color?: string;
    setQuizzData?: (q: CourseQuizz) => void;
}
function Quizz({ quizzData, color, readonly, setQuizzData }: quizzProps) {
    const theme = useTheme();
    const [quizz, setQuizz] = React.useState<CourseQuizz | undefined>(quizzData);

    const updateQuizz = (question: QuizzQuestion) => {
        const q = { ...quizz };

        if (q.questions) {
            let index = q.questions.findIndex(x => x.key === question.key);
            if (index >= 0) q.questions[index] = { ...question };
            else q.questions = [...q.questions, question];
        } else {
            q.questions = [question];
        }
        setQuizz(q);
    };

    const updateQuizzCallback = useCallback(updateQuizz, [quizz]);

    useEffect(() => {
        if (setQuizzData && quizz) setQuizzData(quizz);
    }, [quizz]);

    return (
        <Stack gap={2}>
            <Typography
                color={color ?? theme.palette.purple.main}
                fontWeight={500}
                variant={'h6'}
            >
                الكويز
            </Typography>
            <Divider />
            {quizz?.questions?.map(question => {
                return (
                    <QuizzQuestionComponent
                        color={color}
                        key={question.key}
                        stringColor={color ? 'gray' : undefined}
                        question={question}
                        readonly={readonly}
                        updateQuizz={updateQuizzCallback}
                    />
                );
            })}
            {!readonly && (
                <MainButton
                    text={'أضف سؤال'}
                    color={theme.palette.secondary.main}
                    onClick={() => {
                        updateQuizz({
                            key: uuidv4(),
                            content: 'سؤال',
                            choices: [
                                {
                                    key: uuidv4(),
                                    content: 'الاختيار',
                                    is_correct_answer: true,
                                },
                            ],
                        });
                    }}
                />
            )}
        </Stack>
    );
}

export default Quizz;
