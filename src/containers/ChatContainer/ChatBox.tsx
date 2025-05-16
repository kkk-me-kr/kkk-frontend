"use client";

import { useState, useRef } from "react";

export default function ChatBox({
  onSubmit,
}: {
  onSubmit: (message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const virtualInputRef = useRef<HTMLDivElement>(null);

  const sanitizeInput = (input: string) => {
    // HTML 태그 제거
    return input.replace(/<[^>]*>/g, "");
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);

    if (virtualInputRef.current) {
      virtualInputRef.current.textContent = newValue;
    }
  };

  const inputToTextarea = (input: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = input;
      textareaRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const handleVirtualInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = sanitizeInput(e.currentTarget.textContent || "");
    inputToTextarea(newValue);
  };

  return (
    <div className="flex flex-2/12 flex-col p-4">
      <div>
        {/* textarea 숨기기 */}
        <textarea
          ref={textareaRef}
          value={message}
          onInput={handleInput}
          className="absolute opacity-0 w-0 h-0"
          rows={1}
        />
        {/* 입력 폼 */}
        <div
          ref={virtualInputRef}
          className="w-full min-h-[40px] max-h-[200px] p-2 border rounded-lg focus:outline-none whitespace-pre-wrap break-words overflow-y-scroll"
          contentEditable
          onInput={handleVirtualInput}
          onPaste={(e) => {
            e.preventDefault();
            const text = e.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
          }}
          role="textbox"
          aria-multiline="true"
          tabIndex={0}
        />
      </div>
      <div className="mt-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => {
            onSubmit(message);
            inputToTextarea("");
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
}
