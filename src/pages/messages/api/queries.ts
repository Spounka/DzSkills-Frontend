import { axiosBare } from '../../../globals/axiosInstance';
import { Conversation, MessagePagination } from '../../../types/messages';

export async function getConversation(id: number, course: boolean = false) {
    const url = course ? `/conversations/get/${id}/` : `/conversations/${id}/`;
    const { data } = await axiosBare.get(url);
    return data as Conversation;
}

export async function getMessages(conversationID: number | undefined) {
    if (!conversationID) return Promise.reject('No ID');

    const { data } = await axiosBare.get(`/conversations/${conversationID}/`);
    return data as MessagePagination;
}

export async function createMessage(body: FormData) {
    const { data } = await axiosBare.post('/conversations/messages/', body);
    return data;
}
