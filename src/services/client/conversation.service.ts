import { fetchOnClient } from '../fetch.service';

type FetchConversationsResponse = {
	id: number;
	userId: string;
	title?: string | null;
	status: 'ACTIVE' | 'ARCHIVED' | 'DELETED';
	createdAt: Date;
	updatedAt: Date;
}[];

type CreateConversationResponse = FetchConversationsResponse[0];

type FetchChatsResponse = {
	chats: {
		conversationId: string;
		turn: number;
		content: string;
		subject: 'user' | 'assistant';
		createdAt: Date;
		updatedAt: Date;
	}[];
};

type SendUserChatResponse = {
	conversationId: string;
	userChat: {
		turn: number;
		content: string;
		subject: 'user';
		createdAt: Date;
		updatedAt: Date;
	};
	assistantChat: {
		turn: number;
		content: string;
		subject: 'assistant';
		createdAt: Date;
		updatedAt: Date;
	};
};

export const fetchConversations = async (
	userId: string,
): Promise<FetchConversationsResponse> => {
	const response = await fetchOnClient({
		path: `/api/conversations?userId=${userId}`,
	});
	return response;
};

export const fetchChats = async (
	conversationId: string,
): Promise<FetchChatsResponse> => {
	const response = await fetchOnClient({
		path: `/api/conversations/${conversationId}/chats`,
	});
	return response;
};

export const createConversation = async (
	userId: string,
	title?: string,
): Promise<CreateConversationResponse> => {
	const response = await fetchOnClient({
		path: `/api/conversations`,
		options: {
			method: 'POST',
		},
		headers: {
			'Content-Type': 'application/json',
		},
		body: { userId, title },
	});
	return response;
};

export const sendUserChat = async (
	conversationId: string,
	content: string,
): Promise<SendUserChatResponse> => {
	const response = await fetchOnClient({
		path: `/api/conversations/${conversationId}/chats`,
		options: {
			method: 'POST',
		},
		headers: {
			'Content-Type': 'application/json',
		},
		body: { content },
	});
	return response;
};
