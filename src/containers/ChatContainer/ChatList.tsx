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
		return (
			<div
				key={chat.subject + chat.turn}
				className={`p-4 ${chat.subject === 'user' ? 'bg-gray-100' : 'bg-white'}`}
			>
				<p className="text-sm text-gray-500 mb-1">
					{chat.subject === 'user' ? '사용자' : '어시스턴트'}
				</p>
				<p className="whitespace-pre-wrap">{chat.content}</p>
			</div>
		);
	};
	return (
		<div className="flex basis-auto flex-col overflow-y-scroll">
			{conversation && conversation.chats.length > 0 ? (
				conversation.chats.map(chat => makeChat(chat))
			) : (
				<>
					<div className="flex justify-center items-center h-full">
						<p>오늘은 어떤 것이 궁금한가요?</p>
					</div>
				</>
			)}
			{status.status === 'loading' && (
				<>
					{status.chat && makeChat(status.chat)}
					<div className="p-4 bg-white">
						<p className="text-sm text-gray-500 mb-1">어시스턴트</p>
						<p>답변을 생성하고 있습니다...</p>
					</div>
				</>
			)}
			{status.status === 'error' && (
				<>
					{status.chat && makeChat(status.chat)}
					<div className="p-4 bg-red-100">
						<p className="text-sm text-red-500">
							오류가 발생했습니다. 다시 시도해주세요.
						</p>
					</div>
				</>
			)}
		</div>
	);
}
