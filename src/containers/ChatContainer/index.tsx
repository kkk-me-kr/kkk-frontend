'use client';

import { useEffect, useState } from 'react';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';
import ChatSideBar from './ChatSideBar';
import {
	createConversation,
	fetchConversations,
	fetchChats,
	sendUserChat,
} from '@/services/client/conversation.service';
import { v7 as uuidv7 } from 'uuid';
import { Conversation, Chat } from '@/types';

const USER_ID_KEY = 'chat_user_id';

function getUserId(): string {
	const userId = localStorage.getItem(USER_ID_KEY);
	if (userId) return userId;

	// 새 사용자 ID 생성 및 저장
	const newUserId = uuidv7();
	localStorage.setItem(USER_ID_KEY, newUserId);
	return newUserId;
}

export default function ChatContainer() {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [selectedConversationId, setSelectedConversationId] = useState<
		string | null
	>(null);
	const [currentChatStatus, setCurrentChatStatus] = useState<{
		status: 'idle' | 'loading' | 'error';
		chat: Chat | null;
	}>({
		status: 'idle',
		chat: null,
	});

	const selectedConversation = conversations.find(
		conversation => conversation.id === selectedConversationId,
	);

	// 대화 목록 조회
	useEffect(() => {
		const loadConversations = async () => {
			try {
				const userId = getUserId();
				const response = await fetchConversations(userId);
				setConversations(
					response.map((conv, index) => ({
						id: conv.id.toString(),
						title: `${response.length - index}번째 대화`,
						chats: [],
						createdAt: conv.createdAt,
					})),
				);
			} catch (error) {
				console.error('Error loading conversations:', error);
				setCurrentChatStatus({
					status: 'error',
					chat: null,
				});
			}
		};

		loadConversations();
	}, []);

	// 선택된 대화의 채팅 내역 조회
	useEffect(() => {
		const loadChats = async () => {
			if (!selectedConversationId) return;
			try {
				const response = await fetchChats({
					conversationId: selectedConversationId,
					userId: getUserId(),
				});
				setConversations(prev =>
					prev.map(conv =>
						conv.id === selectedConversationId
							? { ...conv, chats: response.chats }
							: conv,
					),
				);
				setCurrentChatStatus({
					status: 'idle',
					chat: null,
				});
			} catch (error) {
				console.error('Error loading chats:', error);
				setCurrentChatStatus({
					status: 'error',
					chat: null,
				});
			}
		};

		loadChats();
	}, [selectedConversationId]);

	const handleChatSubmit = async (message: string) => {
		try {
			setCurrentChatStatus({
				status: 'loading',
				chat: {
					turn:
						selectedConversation?.chats.filter(chat => chat.subject === 'user')
							.length ?? 0 + 1,
					content: message,
					subject: 'user',
				},
			});

			const promise = new Promise(async resolve => {
				let conversation = selectedConversation;
				if (!conversation) {
					// 새 대화 생성
					const userId = getUserId();
					const response = await createConversation({
						userId,
					});
					conversation = {
						id: response.id.toString(),
						title: `${conversations.length + 1}번째 대화`,
						chats: [],
						createdAt: response.createdAt,
					};
				}

				// 서버에 메시지 전송
				const response = await sendUserChat({
					conversationId: conversation.id,
					content: message,
					userId: getUserId(),
				});
				resolve({
					conversation,
					userChat: response.userChat,
					assistantChat: response.assistantChat,
				});
			});
			promise
				.then(result => {
					const { conversation, userChat, assistantChat } = result as {
						conversation: Conversation;
						userChat: Chat;
						assistantChat: Chat;
					};
					setConversations(prev => [
						...prev.filter(conv => conv.id !== conversation.id),
						{
							...conversation,
							chats: [...conversation.chats, userChat, assistantChat],
						},
					]);
					setSelectedConversationId(conversation.id);
					setCurrentChatStatus({
						status: 'idle',
						chat: null,
					});
				})
				.catch(error => {
					console.error('Error sending chat:', error);
					setCurrentChatStatus({
						status: 'error',
						chat: {
							turn:
								selectedConversation?.chats.filter(
									chat => chat.subject === 'user',
								).length ?? 0,
							content: message,
							subject: 'user',
						},
					});
				});
		} catch (error) {
			console.error('Error sending chat:', error);
			setCurrentChatStatus({
				status: 'error',
				chat: {
					turn:
						selectedConversation?.chats.filter(chat => chat.subject === 'user')
							.length ?? 0,
					content: message,
					subject: 'user',
				},
			});
		}
	};

	const onNewConversationClick = () => {
		setSelectedConversationId(null);
		setCurrentChatStatus({
			status: 'idle',
			chat: null,
		});
	};

	const onConversationHistoryClick = (conversation: Conversation) => {
		setSelectedConversationId(conversation.id);
	};

	return (
		<div className="h-full w-full flex flex-row bg-[#212121]">
			<ChatSideBar
				conversations={conversations}
				onNewConversationClick={onNewConversationClick}
				onConversationHistoryClick={onConversationHistoryClick}
			/>
			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<ChatHeader />
				<ChatList
					conversation={selectedConversation}
					status={currentChatStatus}
				/>
				<ChatBox
					onChatSubmit={handleChatSubmit}
					disabled={currentChatStatus.status === 'loading'}
				/>
			</div>
		</div>
	);
}
