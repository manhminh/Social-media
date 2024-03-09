import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostAction,
  updatePostsAction,
} from "../../redux/post/post.action";
import { toast } from "react-toastify";

const MiddlePart = () => {
  const story = [1, 1, 1, 1, 1];
  const [stompClient, setStompClient] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const post = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    const sock = new SockJS("http://localhost:8081/ws");
    const stomp = Stomp.over(sock);

    stomp.connect({}, () => {
      console.log("Connected to WebSocket");
      stomp.subscribe("/user/1/topic", (message) => {
        console.log("Received message:", JSON.parse(message.body));
        let receivedMessage = JSON.parse(message.body);
        if (message) {
          toast.success(
            receivedMessage.user?.firstName +
              " " +
              receivedMessage.user?.lastName +
              " " +
              "have a new post"
          );
        }
        // dispatch(updatePostsAction(JSON.parse(message.body)));
      });
    });
    setStompClient(stomp);

    return () => {
      stomp.disconnect();
    };
  }, []); // Empty dependency array to ensure it runs only once

  console.log(post.posts);

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      if (stompClient.connected) {
        // Ensure the connection is established before sending
        stompClient.send("/app/post/1", {}, JSON.stringify(newMessage));
      } else {
        console.log("WebSocket connection not established yet.");
      }
    }
  };

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [post.newComment, post.post]);

  const handleClose = () => {
    setOpenCreateModal(false);
  };

  const handleOpenCreatePostModal = () => {
    setOpenCreateModal(true);
  };

  return (
    <div className="px-20">
      <section className="flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ height: "4rem", width: "4rem" }}>
            <AddIcon sx={{ fontSize: "2rem" }} />
          </Avatar>
          <p>New</p>
        </div>

        {story.map((item, index) => (
          <StoryCircle key={index + 1} />
        ))}
      </section>

      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar className="border border-gray-500" />
          <input
            onClick={handleOpenCreatePostModal}
            className="outline-none w-[90%] rounded-full px-5 bg-transparent border border-[#3b4054]"
            type="text"
          />
        </div>

        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>

            <span>Media</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>

            <span>Video</span>
          </div>

          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>

            <span>Write Article</span>
          </div>
        </div>
      </Card>

      <div className="my-10 space-y-10">
        {post.posts.map((item, index) => (
          <PostCard key={index + 1} post={item} />
        ))}
      </div>

      <div>
        <CreatePostModal
          open={openCreateModal}
          handleClose={handleClose}
          sendMessageToServer={sendMessageToServer}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
