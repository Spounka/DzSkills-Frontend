import { User } from './user';

export type MessageFile = {
    id: number;
    file: string;
};
export type UserMessage = {
    id: number;
    content: string;
    date: string;
    sender: number;
    recipient: number;
    files: MessageFile[];
};
export type MessagePagination = {
    next: string;
    previous: string;
    results: UserMessage[];
};

export type Conversation = {
    id: number;
    course: number;
    course_owner: User;
    course_title: string;
    recipient: number;
    student: number;
    student_data: User;
    last_message: UserMessage;
    ticket: Ticket;
};

export type Ticket = {
    id: number;
    converesation: Conversation | number;
    state: 'closed' | 'open';
    data: string;
};
