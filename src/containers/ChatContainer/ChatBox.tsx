import { useRef } from 'react';

export default function ChatBox({
	onChatSubmit,
	disabled,
}: {
	onChatSubmit: (message: string) => void;
	disabled?: boolean;
}) {
	const virtualInputRef = useRef<HTMLDivElement>(null);

	const handleSubmit = () => {
		if (disabled) return;

		const content = virtualInputRef.current?.textContent || '';
		if (content.trim()) {
			onChatSubmit(content);
			if (virtualInputRef.current) {
				virtualInputRef.current.textContent = '';
			}
		}
	};

	return (
		<div className={['w-full flex flex-col', 'px-4 pb-4 pt-2'].join(' ')}>
			<div
				className={[
					'flex items-end w-full gap-1',
					'bg-[#303030] rounded-2xl',
					'px-4 py-3',
					disabled ? 'opacity-60' : '',
				].join(' ')}
			>
				<div
					ref={virtualInputRef}
					className={[
						'flex-1 min-h-8 max-h-32',
						'overflow-x-hidden overflow-y-scroll',
						'bg-transparent text-[#ececf1] outline-none',
						disabled ? 'cursor-not-allowed' : '',
					].join(' ')}
					contentEditable={!disabled}
					onPaste={e => {
						e.preventDefault();
						const text = e.clipboardData.getData('text/plain');
						document.execCommand('insertText', false, text);
					}}
					role="textbox"
					aria-multiline="true"
					tabIndex={0}
				/>
				<button
					onClick={handleSubmit}
					disabled={disabled}
					className={[
						'rounded-full px-4 py-2',
						disabled
							? 'bg-[#444] text-[#aaa] cursor-not-allowed'
							: 'bg-[#40414f] text-[#ececf1] hover:bg-[#565869] cursor-pointer',
						'font-semibold',
					].join(' ')}
				>
					전송
				</button>
			</div>
		</div>
	);
}
