import { NextRequest, NextResponse } from 'next/server';
import {
	fetchChats,
	sendUserChat,
} from '@/services/server/conversation.service';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const { id: conversationId } = await params;

		if (!conversationId) {
			return NextResponse.json(
				{ error: 'conversationId is required' },
				{ status: 400 },
			);
		}

		const turns = await fetchChats(conversationId);
		const response = {
			chats: [
				...turns.map(turn => ({
					conversationId: turn.question.conversationId.toString(),
					turn: turn.question.turn,
					content: turn.question.content,
					subject: 'user' as const,
					createdAt: new Date(turn.question.createdAt),
					updatedAt: new Date(turn.question.updatedAt),
				})),
				...turns.map(turn =>
					turn.answer
						? {
								conversationId: turn.answer.conversationId.toString(),
								turn: turn.answer.turn,
								content: turn.answer.content,
								subject: 'assistant' as const,
								createdAt: new Date(turn.answer.createdAt),
								updatedAt: new Date(turn.answer.updatedAt),
							}
						: null,
				),
			].sort((a, b) => (a?.turn ?? Infinity) - (b?.turn ?? Infinity)),
		};

		return NextResponse.json(response);
	} catch (error) {
		console.error('Error fetching chats:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const { id: conversationId } = await params;
		const body = await request.json();
		const { content } = body;

		if (!conversationId || !content) {
			return NextResponse.json(
				{ error: 'conversationId and content are required' },
				{ status: 400 },
			);
		}

		const { question, answer } = await sendUserChat(conversationId, content);
		const response = {
			conversationId: question.conversationId.toString(),
			userChat: {
				turn: question.turn,
				content: question.content,
				subject: 'user' as const,
				createdAt: new Date(question.createdAt),
				updatedAt: new Date(question.updatedAt),
			},
			assistantChat: answer
				? {
						turn: answer.turn,
						content: answer.content,
						subject: 'assistant' as const,
						createdAt: new Date(answer.createdAt),
						updatedAt: new Date(answer.updatedAt),
					}
				: null,
		};

		return NextResponse.json(response);
	} catch (error) {
		console.error('Error sending chat:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
