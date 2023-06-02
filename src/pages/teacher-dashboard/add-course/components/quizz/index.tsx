import { ExpandMore } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Divider,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { StyledOutline } from '../../../../../components/form/StyledOutline';
import { MainButton } from '../../../../../components/ui/MainButton';
import { Course } from '../../../../../types/course';

type QuizzQuestion = {
    content: string;
    is_correct_answer: boolean;
};
type QuizzType = {
    course: Course;
    questions?: QuizzQuestion[];
};

function Quizz() {
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [quizzQuestion, setQuizzQuestion] = React.useState<QuizzQuestion>();
    return (
        <Stack gap={2}>
            <Typography
                color={theme.palette.purple.main}
                fontWeight={500}
                variant={'h6'}
            >
                الكويز
            </Typography>
            <Divider />
            <Box
                sx={{
                    width: '100%',
                    minHeight: '100px',
                    bgcolor: '#323287',
                    borderRadius: theme.spacing(),
                    p: 3,
                }}
            >
                <Accordion
                    expanded={expanded}
                    onChange={(_, b) => setExpanded(b)}
                    sx={{
                        bgcolor: 'transparent',
                        border: 'unset',
                        outline: 'none',
                        boxShadow: 'none',
                        borderTop: 'none',
                        color: 'white',
                        width: '100%',
                        ':before': { display: 'none' },
                    }}
                >
                    <AccordionSummary
                        sx={{
                            color: 'white',
                            transition: 'all 200ms ease-in-out',
                            '&.Mui-expanded': {
                                transition: 'all 200ms ease-in-out',
                                minHeight: 'auto',
                            },
                        }}
                        expandIcon={
                            <ExpandMore
                                sx={{
                                    color: 'white',
                                    width: '36px',
                                    height: '36px',
                                }}
                            />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Box
                            sx={{
                                // display: `${expanded ? 'none' : 'block'}`,
                            }}
                        >
                            <Typography>
                                {quizzQuestion?.content || 'السؤال'}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            display: 'flex',
                            gap: 4,
                            flexDirection: 'column',
                        }}
                    >
                        <StyledOutline
                            multiline
                            color={'secondary'}
                            sx={{
                                bgcolor: 'white',
                                width: '100%',
                            }}
                        />
                        <Typography>خيارات الإجابة</Typography>
                        <Stack
                            direction="row"
                            gap={2}
                            width={'100%'}
                            p={0}
                            m={0}
                        >
                            <Stack
                                direction="row"
                                flexBasis={'50%'}
                            >
                                <Checkbox
                                    value={false}
                                    color="secondary"
                                />
                                <StyledOutline
                                    color={'secondary'}
                                    sx={{ bgcolor: 'white', width: '100%' }}
                                />
                            </Stack>

                            <Stack
                                direction="row"
                                flexBasis={'50%'}
                                width={'100%'}
                                flexGrow={1}
                            >
                                <Checkbox
                                    value={false}
                                    color="secondary"
                                />
                                <StyledOutline
                                    color={'secondary'}
                                    sx={{ bgcolor: 'white', width: '100%' }}
                                />
                            </Stack>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <MainButton
                text={'أضف سؤال'}
                color={theme.palette.secondary.main}
            />
        </Stack>
    );
}

export default Quizz;
