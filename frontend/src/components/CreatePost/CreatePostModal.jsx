import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/post/post.action";
import { uploadToCloudinary } from "../../utils/uploadToCloudnary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const CreatePostModal = ({ open, handleClose, sendMessageToServer }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { caption: "", image: "", video: "" },
    onSubmit: (values) => {
      dispatch(createPostAction({ postData: values, sendMessageToServer }));
      handleClose();
      setSelectedImage("");
      setSelectedVideo("");
    },
  });

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl);
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
    setSelectedVideo(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex justify-between">
                <Avatar className="flex space-x-4 items-center" />
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="mt-3">
                <p className="font-bold text-lg">Minh Manh</p>
                <p className="text-sm">@manhminh</p>
              </div>
              <textarea
                placeholder="write caption..."
                name="caption"
                value={formik.values.caption}
                onChange={formik.handleChange}
                id="caption"
                rows="4"
                className="outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054]"
              ></textarea>
              <div className="flex space-x-5 items-center">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                    style={{ display: "none" }}
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <IconButton color="primary" component="span">
                      <ImageIcon />
                    </IconButton>
                  </label>
                  <span>Image</span>
                </div>
                <div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleSelectVideo}
                    style={{ display: "none" }}
                    id="video-input"
                  />
                  <label htmlFor="video-input">
                    <IconButton color="primary" component="span">
                      <VideoCallIcon />
                    </IconButton>
                  </label>
                  <span>Video</span>
                </div>
              </div>
              {selectedImage && (
                <div>
                  <img src={selectedImage} className="h-[10rem]" alt="" />
                </div>
              )}
              {selectedVideo && (
                <div>
                  <video src={selectedVideo} className="h-[10rem]" alt="" />
                </div>
              )}
              <div className="flex flex-end w-full pt-5">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: "1.5rem" }}
                >
                  Post
                </Button>
              </div>
            </div>
          </form>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
