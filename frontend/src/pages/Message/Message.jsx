import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../components/SearchUser/SearchUser";
import "./Message.css";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../redux/message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../utils/uploadToCloudnary";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(getAllChats());
  }, []);

  const [currentChat, setCurrentChat] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatContainerUserRef = useRef(null);

  const dispatch = useDispatch();

  const message = useSelector((state) => state.message);
  const auth = useSelector((state) => state.auth);

  console.log(message);

  const navigate = useNavigate();

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS("http://localhost:8081/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onErr);

    return () => {
      stomp.disconnect();
    };
  }, []);

  const onConnect = () => {
    console.log("WebSocket connected...");
  };

  const onErr = (err) => {
    console.log("WebSocket error: ", err);
  };

  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceive
      );

      console.log(subscription);

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, auth.user, currentChat, messages]);

  const onMessageReceive = (payload) => {
    const decodedPayload = atob(JSON.parse(payload.body).payload);
    const receivedMessage = JSON.parse(decodedPayload);

    console.log("Message received from WebSocket: ", receivedMessage);

    // Update messages state with the received message
    setMessages([...messages, receivedMessage]);
    console.log("messages: ", messages);
  };

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  useEffect(() => {
    if (chatContainerUserRef.current) {
      chatContainerUserRef.current.scrollTop =
        chatContainerUserRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCreateMessage = (value) => {
    const newMessage = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({ message: newMessage, sendMessageToServer }));
  };

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div
                className="flex space-x-4 items-center py-5 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>

              <div className="h-[82vh]">
                <div>
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollBar">
                  {message.chats.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-1 p-5">
                <div className="flex items-center space-x-3">
                  <Avatar
                    className="border border-gray-500"
                    src="https://marmelab.com/images/blog/ascii-art-converter/homer.png"
                  />
                  <p>
                    {auth.user?.id === currentChat.users[0]?.id
                      ? currentChat.users[1].firstName +
                        " " +
                        currentChat.users[1].lastName
                      : currentChat.users[0].firstName +
                        " " +
                        currentChat.users[0].lastName}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>

                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>

              <div
                ref={chatContainerUserRef}
                className="hideScrollBar overflow-y-scroll h-[82vh] px-2 space-x-5 py-5"
              >
                {messages.map((item) => (
                  <ChatMessage key={item?.id} item={item} />
                ))}
              </div>

              <div className="sticky bottom-0 border-1">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    alt="image"
                  />
                )}

                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (
                        e.key === "Enter" &&
                        (e.target.value || selectedImage)
                      ) {
                        handleCreateMessage(e.target.value);
                        setSelectedImage("");
                        e.target.value = "";
                      }
                    }}
                    type="text"
                    className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
                    placeholder="Type messasge..."
                  />

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No chat selected</p>
            </div>
          )}
        </Grid>
      </Grid>

      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="#fff" />
      </Backdrop> */}
    </div>
  );
};

export default Message;
