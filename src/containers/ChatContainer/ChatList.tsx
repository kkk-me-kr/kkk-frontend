import { Conversation } from '@/types';

import { Chat } from '@/types';

export default function ChatList({
	conversation,
	status,
}: {
	conversation: Conversation | null | undefined;
	status: {
		status: 'idle' | 'loading' | 'error';
		chat: Chat | null;
	};
}) {
	const makeChat = (chat: Chat) => {
		const isUser = chat.subject === 'user';
		return (
			<div
				key={chat.subject + chat.turn}
				className={[
					'flex w-full',
					isUser ? 'justify-end' : 'justify-start',
					'py-1',
				].join(' ')}
			>
				<div
					className={[
						'inline-block max-w-[80%]',
						'px-4 py-2 text-base',
						isUser
							? 'bg-[#40414f] text-[#ececf1] rounded-2xl rounded-br-md'
							: 'bg-[#232323] text-[#ececf1] rounded-2xl rounded-bl-md',
						'shadow',
					].join(' ')}
				>
					<p className="whitespace-pre-wrap break-words">{chat.content}</p>
				</div>
			</div>
		);
	};
	return (
		<div className={['flex flex-col flex-1 overflow-y-auto', 'p-4'].join(' ')}>
			{status.status === 'idle' &&
				(conversation && conversation.chats.length > 0 ? (
					conversation.chats.map(chat => makeChat(chat))
				) : (
					<div className="flex flex-1 justify-center items-center">
						<p className="text-[#ececf1] text-xl font-bold">
							오늘은 어떤 것이 궁금한가요?
						</p>
					</div>
				))}
			{status.status === 'loading' && (
				<>
					{status.chat && makeChat(status.chat)}
					{makeChat({
						subject: 'assistant',
						turn: -1,
						content: '답변을 생성하고 있습니다...',
					})}
				</>
			)}
			{status.status === 'error' && (
				<>
					{status.chat && makeChat(status.chat)}
					<div className="flex w-full justify-start py-1">
						<div className="inline-block max-w-[80%] px-4 py-2 text-base bg-red-100 text-red-700 rounded-2xl rounded-bl-md shadow">
							<p className="whitespace-pre-wrap break-words">
								오류가 발생했습니다. 다시 시도해주세요.
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
