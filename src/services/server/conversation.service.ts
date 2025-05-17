import { fetchOnQueryVault } from '../fetch.service';

type Conversation = {
	id: number;
	userId: string;
	title?: string | null;
	status: 'ACTIVE' | 'ARCHIVED' | 'DELETED';
	createdAt: Date;
	updatedAt: Date;
};

type Question = {
	conversationId: string;
	turn: number;
	content: string;
	createdAt: Date;
	updatedAt: Date;
};

type Answer =
	| {
			conversationId: string;
			turn: number;
			content: string;
			createdAt: Date;
			updatedAt: Date;
	  }
	| null
	| undefined;

export const fetchConversations = async (
	userId: string,
): Promise<Conversation[]> => {
	const response = await fetchOnQueryVault({
		path: `/conversations?userId=${userId}`,
	});
	return response;
};

export const createConversation = async (
	userId: string,
	title?: string,
): Promise<Conversation> => {
	const response = await fetchOnQueryVault({
		path: `/conversations`,
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

export const fetchChats = async (
	conversationId: string,
): Promise<
	{
		question: Question;
		answer: Answer;
	}[]
> => {
	const response = await fetchOnQueryVault({
		path: `/conversations/${conversationId}/turns`,
	});
	return response;
};

export const sendUserChat = async (
	conversationId: string,
	query: string,
): Promise<{
	question: Question;
	answer: Answer | null | undefined;
}> => {
	const response = await fetchOnQueryVault({
		path: `/conversations/${conversationId}/turns`,
		options: {
			method: 'POST',
		},
		headers: {
			'Content-Type': 'application/json',
		},
		body: { query },
	});
	return response;
};
