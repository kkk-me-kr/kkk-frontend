import {
	createConversation,
	fetchConversations,
} from '@/services/server/conversation.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get('userId');

		if (!userId) {
			return NextResponse.json(
				{ error: 'userId is required' },
				{ status: 400 },
			);
		}

		const conversations = await fetchConversations(userId);
		const response = conversations
			.map(conv => ({
				id: conv.id,
				userId: conv.userId,
				title: conv.title,
				status: conv.status,
				createdAt: new Date(conv.createdAt),
				updatedAt: new Date(conv.updatedAt),
			}))
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		return NextResponse.json(response);
	} catch (error) {
		console.error('Error fetching conversations:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { userId, title } = body;
		if (!userId) {
			return NextResponse.json(
				{ error: 'userId is required' },
				{ status: 400 },
			);
		}

		const conversation = await createConversation(userId, title);
		const response = {
			id: conversation.id,
			userId: conversation.userId,
			title: conversation.title,
			status: conversation.status,
			createdAt: new Date(conversation.createdAt),
			updatedAt: new Date(conversation.updatedAt),
		};

		return NextResponse.json(response);
	} catch (error) {
		console.error('Error creating conversation:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}
