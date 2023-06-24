import { Course } from './course';

export type QuizzChoice = {
    id?: number;
    key?: string;
    content?: string;
    is_correct_answer?: boolean;
};

export type QuizzQuestion = {
    id?: number;
    key?: string;
    content?: string;
    choices?: QuizzChoice[];
    // quizz: CourseQuizz;
};

export type CourseQuizz = {
    id?: number;
    course?: Course | number;
    questions?: QuizzQuestion[];
};
