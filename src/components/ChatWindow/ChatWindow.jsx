import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function ChatWindow(id) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const influencerId = id; // Change this to your influencer ID
  const nickname = localStorage?.getItem("username"); // Change this to your nickname
  console.log(nickname);
  const socket = io("ws://101.79.11.102", {
    withCredentials: true,
  });

  useEffect(() => {
    socket.on("chat_output", (data) => {
      console.log(data); // Add this line to log the received data

      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.emit("req_chat_list", { influencerId });

    socket.on("res_chat_list", (data) => {
      // Process the received data as required
      // Assume the data is an array of messages
      setMessages(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const data = {
        InfluencerId: influencerId,
        nickname: nickname,
        comment: inputValue,
      };
      socket.emit("chat_input", data);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col flex-grow max-w-full w-full bg-white shadow-xl rounded-lg overflow-hidden h-256">
      <div className="flex-grow overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full mt-2 space-x-3 max-w-xs ${
              message.nickname === nickname ? "ml-auto justify-end" : ""
            }`}
          >
            {message.nickname !== nickname && (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            )}
            <div>
              <div
                className={`${
                  message.nickname === nickname
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300"
                } p-3 rounded-lg`}
              >
                <p className="text-sm">{message.comment}</p>
              </div>
              {/* Assume message.time exists and is in a suitable format */}
              <span className="text-xs text-gray-500 leading-none">
                {message.time}
              </span>
            </div>
            {message.nickname === nickname && (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center bg-gray-300 p-4">
        <input
          className="flex-grow rounded-l px-3 text-sm h-10"
          type="text"
          placeholder="Type your message…"
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
