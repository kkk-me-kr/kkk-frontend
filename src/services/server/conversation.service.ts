import { fetchOnQueryVault } from '../fetch.service';

const HEADER_USER_ID = 'x-user-id';

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
		path: `/conversations`,
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
}): Promise<Conversation> => {
	const response = await fetchOnQueryVault({
		path: `/conversations`,
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

export const fetchChats = async ({
	conversationId,
	userId,
}: {
	conversationId: string;
	userId: string;
}): Promise<
	{
		question: Question;
		answer: Answer;
	}[]
> => {
	const response = await fetchOnQueryVault({
		path: `/conversations/${conversationId}/turns`,
		headers: {
			[HEADER_USER_ID]: userId,
		},
	});
	return response;
};

export const sendUserChat = async ({
	conversationId,
	query,
	userId,
}: {
	conversationId: string;
	query: string;
	userId: string;
}): Promise<{
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
			[HEADER_USER_ID]: userId,
		},
		body: { query },
	});
	return response;
};
