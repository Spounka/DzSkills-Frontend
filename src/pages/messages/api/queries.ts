import axiosInstance from '../../../globals/axiosInstance';
import { Conversation, MessagePagination } from '../../../types/messages';

export async function getConversation(courseID: number) {
    const { data } = await axiosInstance.get(`/conversations/get/${courseID}/`);
    return data as Conversation;
}

export async function getMessages(conversationID: number | undefined) {
    const { data } = await axiosInstance.get(`/conversations/${conversationID}/`);
    return data as MessagePagination;
}

export async function createMessage(body: FormData) {
    const { data } = await axiosInstance.post('/conversations/messages/', body);
    return data;
}
