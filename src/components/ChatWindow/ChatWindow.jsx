import React, { useState, useEffect, useMemo, useRef } from "react";
import io from "socket.io-client";

function ChatWindow({ id, userId, img }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const influencerId = id;
  const chatContainerRef = useRef(null);

  const socket = useMemo(
    () =>
      io("ws://101.79.11.102", {
        withCredentials: true,
      }),
    []
  );

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleChatOutput = (data) => {
      setMessages((prevMessages) => {
        // Ensure the new message isn't already in the list
        if (!prevMessages.some((msg) => msg.id === data.id)) {
          return [data, ...prevMessages];
        }
        return prevMessages;
      });
    };

    const handleChatList = (data) => {
      // Remove the reverse method call to keep the original order
      setMessages((prevMessages) => {
        const newMessages = data.filter(
          (newMsg) => !prevMessages.some((prevMsg) => prevMsg.id === newMsg.id)
        );
        return [...newMessages, ...prevMessages];
      });
    };

    socket.on("chat_output", handleChatOutput);
    socket.emit("req_chat_list", { influencerId });
    socket.on("res_chat_list", handleChatList);
  }, [socket, influencerId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const data = {
        influencerId: influencerId,
        userId: userId,
        comment: inputValue,
      };
      socket.emit("chat_input", data);
      setInputValue("");
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto flex flex-col h-[510px] scrollbar">
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto flex flex-col h-[510px] scrollbar-hide"
      >
        {[...messages].reverse().map((message, index) => (
          <div
            key={index} // Note: Using index as key is not recommended, prefer using unique ids
            className={`flex w-full mt-2 space-x-3 max-w-xs ${
              message.userId === userId ? "ml-auto justify-end" : ""
            }`}
          >
            {message.userId !== userId && (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                <img
                  src={img}
                  alt="User avatar"
                  className="rounded-full h-full w-full object-cover"
                />
              </div>
            )}
            <div>
              <div
                className={`${
                  message.userId === userId
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300"
                } p-3 rounded-lg`}
              >
                <p className="text-sm">{message.comment}</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                {message.time}
              </span>
            </div>
            {message.userId === userId && (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                <img
                  src={img}
                  alt="User avatar"
                  className="rounded-full h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex items-center bg-gray-300 p-4">
        <input
          className="flex-grow rounded-l px-3 text-sm h-10"
          type="text"
          placeholder="좋아하는 인플루언서에게 응원한마디"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="flex-shrink bg-blue-500 text-white rounded-r p-2 h-10"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
