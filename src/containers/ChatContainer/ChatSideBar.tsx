import { useState } from 'react';
import Image from 'next/image';
import MenuIcon from '@/components/icons/Menu';
import NewChatIcon from '@/components/icons/NewChat';
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

	// 모바일 오버레이 닫기 핸들러
	const handleOverlayClick = () => {
		setOpen(false);
	};

	return (
		<>
			{/* 모바일 오버레이 */}
			{open && (
				<div
					className={[
						'fixed inset-0 z-30 md:hidden',
						'bg-black opacity-50',
						'transition-opacity duration-300',
					].join(' ')}
					onClick={handleOverlayClick}
				/>
			)}
			<div
				className={[
					'flex flex-col h-screen z-40',
					'top-0 left-0 fixed md:relative',
					'text-[#ececf1]',
					'transition-all duration-300',
					open ? 'w-64 bg-inherit' : 'md:w-24 w-12',
					'overflow-x-hidden',
				].join(' ')}
			>
				<div
					className={[
						'flex flex-row items-center',
						'p-2',
						open ? 'justify-between' : 'justify-center',
					].join(' ')}
				>
					<div className="w-10 h-10 flex justify-center items-center">
						<button
							onClick={() => setOpen(!open)}
							aria-label={open ? '사이드바 닫기' : '사이드바 열기'}
						>
							<div className="w-6 h-6">
								<MenuIcon />
							</div>
						</button>
					</div>
					<div
						className={[
							'w-10 h-10 flex justify-center items-center',
							open ? '' : 'hidden md:flex',
						].join(' ')}
					>
						<button
							onClick={() => {
								onNewConversationClick?.();
								setOpen(false);
							}}
							aria-label="새로운 대화"
						>
							<div className="w-6 h-6">
								<NewChatIcon />
							</div>
						</button>
					</div>
				</div>
				<div
					className={[
						'flex-auto flex flex-col gap-1',
						'py-2 px-1',
						open ? 'block' : 'hidden',
					].join(' ')}
				>
					{conversations.length > 0 ? (
						conversations.map(conversation => (
							<button
								key={conversation.id}
								onClick={() => {
									onConversationHistoryClick?.(conversation);
									setOpen(false);
								}}
								className={[
									'flex items-center w-full text-left px-3 py-2 rounded',
									'hover:bg-[#232323] text-[#ececf1] text-sm',
									'focus:outline-none',
								].join(' ')}
							>
								{conversation.title}
							</button>
						))
					) : (
						<div className="flex justify-center items-center h-full">
							<p className="text-[#888] text-sm">채팅이 없습니다.</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
