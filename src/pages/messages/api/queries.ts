import { axiosBare } from '../../../globals/axiosInstance';
import { Conversation, MessagePagination } from '../../../types/messages';

export async function getConversation(id: number, course: boolean = false) {
    const url = course ? `/conversations/get/${id}/` : `/conversations/${id}/`;
    const { data } = await axiosBare.get(url);
    return data as Conversation;
}

export async function getMessages(
    conversationID: number | undefined,
    cursor: any = undefined
) {
    console.log('Cursor: ', cursor);
    console.log('Message conversation ID: ', conversationID);
    if (!conversationID || conversationID === 0) return Promise.reject('No ID');
    const url = cursor ?? `/conversations/${conversationID}/`;

    const { data } = await axiosBare.get(url);
    return data as MessagePagination;
}

export async function createMessage(body: FormData) {
    const { data } = await axiosBare.post('/conversations/messages/', body);
    return data;
}
