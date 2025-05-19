import { fetchOnClient } from '../fetch.service';

const HEADER_USER_ID = 'x-user-id';

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
		path: `/api/conversations`,
		headers: {
			[HEADER_USER_ID]: userId,
		},
	});
	return response;
};

export const fetchChats = async ({
	conversationId,
	userId,
}: {
	conversationId: string;
	userId: string;
}): Promise<FetchChatsResponse> => {
	const response = await fetchOnClient({
		path: `/api/conversations/${conversationId}/chats`,
		headers: {
			[HEADER_USER_ID]: userId,
		},
	});
	return response;
};

export const createConversation = async ({
	userId,
	title,
}: {
	userId: string;
	title?: string;
}): Promise<CreateConversationResponse> => {
	const response = await fetchOnClient({
		path: `/api/conversations`,
		options: {
			method: 'POST',
		},
		headers: {
			'Content-Type': 'application/json',
			[HEADER_USER_ID]: userId,
		},
		body: { title },
	});
	return response;
};

export const sendUserChat = async ({
	conversationId,
	content,
	userId,
}: {
	conversationId: string;
	content: string;
	userId: string;
}): Promise<SendUserChatResponse> => {
	const response = await fetchOnClient({
		path: `/api/conversations/${conversationId}/chats`,
		options: {
			method: 'POST',
		},
		headers: {
			'Content-Type': 'application/json',
			[HEADER_USER_ID]: userId,
		},
		body: { content },
	});
	return response;
};
