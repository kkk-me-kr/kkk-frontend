export default function ChatHeader() {
  return (
    <div className="flex flex-row h-14">
      <div className="flex justify-center items-center">
        <button>메뉴 버튼</button>
      </div>
      <div className="flex flex-auto justify-center items-center">
        QueryVault
      </div>
      <div className="flex justify-center items-center">
        <button>기타</button>
      </div>
    </div>
  );
}
