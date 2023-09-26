import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { useCallback } from 'react';
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
    let quizz = { ...quizzData };

    const updateQuizz = (question: QuizzQuestion) => {
        const q = { ...quizz };

        if (q.questions) {
            let index = -1;
            index = q.questions.findIndex(x => {
                if (x.key) return x.key === question.key;
                return x.id === question.id;
            });
            if (index >= 0) q.questions[index] = { ...question };
            else q.questions = [...q.questions, question];
        } else {
            q.questions = [question] as QuizzQuestion[];
        }
        setQuizzData?.(q);
    };

    const updateQuizzCallback = useCallback(updateQuizz, [quizz]);
    const removeQuestion = useCallback(
        (uuid?: string | number) => {
            if (!uuid) return;
            const qu = { ...quizz };
            qu.questions = qu.questions?.filter(q => {
                if (typeof uuid === 'number') return q.id !== uuid;
                return q.key !== uuid;
            });
            setQuizzData?.(qu);
        },
        [quizz]
    );

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
            {quizzData?.questions?.map(question => {
                return (
                    <QuizzQuestionComponent
                        color={color}
                        key={question.key}
                        stringColor={color ? 'gray' : undefined}
                        question={question}
                        readonly={readonly}
                        updateQuizz={updateQuizzCallback}
                        removeQuestion={removeQuestion}
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
