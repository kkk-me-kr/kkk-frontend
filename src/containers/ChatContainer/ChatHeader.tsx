export default function ChatHeader() {
	return (
		<div
			className={[
				'flex flex-row items-center w-full h-16',
				'px-4',
				'border-b border-[#323232]',
				'shadow-sm',
			].join(' ')}
		>
			{/* 좌측 */}
			<div className="flex w-12 justify-center items-center"></div>
			{/* 중앙 */}
			<div className="flex flex-1 justify-center items-center">
				<span className="text-[#ececf1] text-xl font-bold tracking-tight select-none">
					KKK
				</span>
			</div>
			{/* 우측 */}
			<div className="flex w-12 justify-center items-center"></div>
		</div>
	);
}
