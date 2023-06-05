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
    teacher: number;
    student: number;
    last_message: UserMessage;
};
