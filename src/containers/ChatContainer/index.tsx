"use client";

import { useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import ChatHeader from "./ChatHeader";

export default function ChatContainer() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleChatSubmit = (message: string) => {
    const question = {
      turn: questions.length + 1,
      content: message,
    };
    // TODO: 응답 API 연동 필요
    const answer = {
      turn: answers.length + 1,
      content: "아주 멋진 답변입니다.",
    };
    setQuestions([...questions, question]);
    setAnswers([...answers, answer]);
  };

  const chats: Chat[] = [];
  questions.forEach((question, index) => {
    chats.push(question);
    if (answers[index]) {
      chats.push(answers[index]);
    }
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChatHeader />
      <ChatList chats={chats} />
      <ChatBox onSubmit={handleChatSubmit} />
    </div>
  );
}
