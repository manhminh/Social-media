import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({ item }) => {
  const auth = useSelector((state) => state.auth);
  const isReqUserMessage = item?.user?.id === auth?.user?.id;
  return (
    <div
      className={`flex my-5 ${
        isReqUserMessage ? "justify-start" : "justify-end"
      } text-white`}
    >
      <div
        className={`p-1 ${
          item?.image ? "rounded-md" : "px-5 rounded-full"
        } bg-[#191c29]`}
      >
        {item?.image && (
          <img
            src={item?.image}
            className="w-[12rem] h-[17rem] object-cover rounded-md"
            alt=""
          />
        )}
        {item?.content && (
          <p className={`${true ? "py-2" : "py-1"}`}>{item.content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
