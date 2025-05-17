export default function ChatList({
	conversation,
}: {
	conversation: Conversation | null | undefined;
}) {
	return (
		<div className="flex basis-auto flex-col overflow-y-scroll">
			{conversation && conversation.chats.length > 0 ? (
				conversation.chats.map((chat, index) => (
					<div key={index}>
						<p>{chat.content}</p>
					</div>
				))
			) : (
				<>
					<div className="flex justify-center items-center h-full">
						<p>오늘은 어떤 것이 궁금한가요?</p>
					</div>
				</>
			)}
		</div>
	);
}
