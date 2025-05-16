export default function ChatList({ chats }: { chats: Chat[] }) {
  return (
    <div className="flex basis-auto flex-col overflow-y-scroll">
      {chats.length > 0 ? (
        chats.map((chat, index) => (
          <div key={index}>
            <p>{chat.content}</p>
          </div>
        ))
      ) : (
        <>
          <div className="flex justify-center items-center h-full">
            <p>메시지가 없습니다.</p>
          </div>
        </>
      )}
    </div>
  );
}
