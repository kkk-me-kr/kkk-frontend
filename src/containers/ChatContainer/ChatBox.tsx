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
		<div className="flex flex-2/12 flex-col p-4">
			<div>
				{/* 입력 폼 */}
				<div
					ref={virtualInputRef}
					className={`w-full min-h-[40px] max-h-[200px] p-2 border rounded-lg focus:outline-none whitespace-pre-wrap break-words overflow-y-scroll ${
						disabled ? 'bg-gray-100 cursor-not-allowed' : ''
					}`}
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
			</div>
			<div className="mt-2">
				<button
					className={`px-4 py-2 rounded-lg ${
						disabled
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-blue-500 hover:bg-blue-600'
					} text-white`}
					onClick={handleSubmit}
					disabled={disabled}
				>
					전송
				</button>
			</div>
		</div>
	);
}
