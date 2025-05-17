import { useState } from 'react';

export default function ChatSideBar({
	conversations,
	onNewConversationClick,
	onConversationHistoryClick,
}: {
	conversations: Conversation[];
	onNewConversationClick?: () => void;
	onConversationHistoryClick?: (conversation: Conversation) => void;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div
			className={[
				'flex flex-col',
				'transition-all duration-300',
				open ? 'w-64' : 'w-24',
			].join(' ')}
		>
			<div className="h-64 flex flex-row justify-between">
				<div>
					<button onClick={() => setOpen(!open)}>
						{open ? 'Close' : 'Open'}
					</button>
				</div>
				<div>
					{open && <button>채팅 검색</button>}
					<button
						onClick={() => {
							onNewConversationClick?.();
						}}
					>
						새 채팅
					</button>
				</div>
			</div>
			<div
				className={['flex-auto flex flex-col', open ? 'block' : 'hidden'].join(
					' ',
				)}
			>
				{conversations.length > 0 ? (
					conversations.map(conversation => (
						<button
							key={conversation.id}
							onClick={() => {
								onConversationHistoryClick?.(conversation);
							}}
						>
							{conversation.title}
						</button>
					))
				) : (
					<div className="flex justify-center items-center h-full">
						<p>채팅이 없습니다.</p>
					</div>
				)}
			</div>
		</div>
	);
}
