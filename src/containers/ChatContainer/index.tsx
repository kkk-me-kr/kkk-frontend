'use client';

import { useState } from 'react';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';
import ChatSideBar from './ChatSideBar';

export default function ChatContainer() {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [selectedConversationId, setSelectedConversationId] = useState<
		string | null
	>(null);
	const [currentChatStatus, setCurrentChatStatus] = useState<
		'idle' | 'loading' | 'error'
	>('idle');
	const selectedConversation = conversations.find(
		conversation => conversation.id === selectedConversationId,
	);

	const doChat = (conversation: Conversation, message: string) => {
		const userChatTurn = Math.max(
			...conversation.chats
				.filter(chat => chat.subject === 'user')
				.map(chat => chat.turn),
		);
		const assistantChatTurn = Math.max(
			...conversation.chats
				.filter(chat => chat.subject === 'assistant')
				.map(chat => chat.turn),
		);
		if (userChatTurn > assistantChatTurn) {
			throw new Error('pending assistant chat is exists or something wrong');
		}

		const question: Chat = {
			turn: userChatTurn + 1,
			content: message,
			subject: 'user',
		};
		conversation.chats = [...conversation.chats, question];

		setTimeout(() => {
			const answer: Chat = {
				turn: assistantChatTurn + 1,
				content: '답변',
				subject: 'assistant',
			};
			conversation.chats = [...conversation.chats, answer];

			setCurrentChatStatus('idle');
		}, 1000);

		setCurrentChatStatus('loading');
	};

	const handleChatSubmit = (message: string) => {
		let conversation = selectedConversation;
		if (!conversation) {
			// TODO: 대화 생성 API 연동해야 합니다.
			conversation = {
				id: (conversations.length + 1).toString(),
				title: '새로운 대화',
				chats: [],
				createdAt: new Date(),
			};
			setConversations([...conversations, conversation]);
			setSelectedConversationId(conversation.id);
		}
		doChat(conversation, message);
	};

	const onNewConversationClick = () => {
		// NOTE: 채팅 하지 않을 것이라면, 대화를 생성할 필요가 없기에, null 처리만 합니다.
		setSelectedConversationId(null);
		setCurrentChatStatus('idle');
	};

	const onConversationHistoryClick = (conversation: Conversation) => {
		setSelectedConversationId(conversation.id);
		setCurrentChatStatus('idle');
	};

	return (
		<div className="flex flex-row">
			<ChatSideBar
				conversations={conversations}
				onNewConversationClick={onNewConversationClick}
				onConversationHistoryClick={onConversationHistoryClick}
			/>
			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<ChatHeader />
				<ChatList conversation={selectedConversation} />
				<ChatBox onChatSubmit={handleChatSubmit} />
			</div>
		</div>
	);
}
