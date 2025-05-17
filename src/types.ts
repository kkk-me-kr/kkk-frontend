interface Conversation {
	id: string;
	title?: string;
	chats: Chat[];
	createdAt: Date;
}

interface Chat {
	turn: number;
	content: string;
	subject: 'user' | 'assistant';
}
