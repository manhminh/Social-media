import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../redux/auth/auth.action";
import { createChat } from "../../redux/message/message.action";

const SearchUser = () => {
  const dispatch = useDispatch();
  const [usernamme, setUsername] = useState("");

  const auth = useSelector((state) => state.auth);

  const messsage = useSelector((state) => state.message);

  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    console.log(auth.searchUsers);
    dispatch(searchUserAction(usernamme));
  };

  const handleClick = (id) => {
    console.log(id);
    let existingChat = messsage.chats.find((chat) => {
      return chat.users.find((user) => user.id === id);
    });
    if (existingChat) {
      console.log("User already exists in the chat");
      return;
    } else {
      dispatch(createChat({ userId: id }));
    }
  };

  return (
    <div>
      <div className="py-5 relative">
        <input
          type="text"
          className="bg-transparent border border-[#3b4054] rounded-full w-full py-3 px-5 outline-none"
          placeholder="Search user..."
          onChange={handleSearchUser}
        />

        {usernamme && (
          <Card className="absolute top-[4.5rem] w-full z-10 cursor-pointer">
            {auth.searchUsers.map((item) => (
              <CardHeader
                key={item.id}
                className="hover:bg-gray-100"
                onClick={() => {
                  handleClick(item.id);
                  setUsername("");
                }}
                avatar={
                  <Avatar
                    className="border border-gray-500"
                    src="https://marmelab.com/images/blog/ascii-art-converter/homer.png"
                  />
                }
                title={`${item.firstName} ${item.lastName}`}
                subheader={`${item.firstName?.toLowerCase()} ${item.lastName?.toLowerCase()}`}
              />
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
