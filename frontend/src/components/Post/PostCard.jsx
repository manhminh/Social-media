import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { red } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  likeUserPostAction,
} from "../../redux/post/post.action";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { isLikedPostByUser } from "../../utils/isLikedPostByUser";

const PostCard = ({ post }) => {
  const [showComment, setShowComment] = useState(false);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleCreateComment = (content) => {
    let reqData = {
      postId: post.id,
      data: {
        content,
      },
    };

    dispatch(createCommentAction(reqData));
  };

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  const handleLikePost = () => {
    dispatch(likeUserPostAction(post.id));
  };

  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={`${post.user?.firstName}  ${post.user?.lastName}`}
          subheader={`@${post.user?.firstName?.toLowerCase()} _${post.user?.lastName?.toLowerCase()}`}
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          }
        />

        {post.image && (
          <CardMedia component="img" height="194" image={post?.image} />
        )}

        {post.video && (
          <CardMedia
            component="video"
            height="194"
            image={post?.video}
            controls
          />
        )}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post?.caption}
          </Typography>
        </CardContent>

        <CardActions disableSpacing className="flex justify-between">
          <div>
            <IconButton aria-label="add to favorites" onClick={handleLikePost}>
              {isLikedPostByUser(auth.user.id, post) ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="comment">
              <ChatBubbleOutlineIcon onClick={handleShowComment} />
            </IconButton>
          </div>

          <div>
            <IconButton aria-label="comment">
              {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </div>
        </CardActions>

        {showComment && (
          <>
            <section className="d-flex items-center space-x-5 mx-3 my-5">
              <div className="flex items-center space-x-5 mx-3 my-5">
                <Avatar />

                <input
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateComment(e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
                  placeholder="write your comment..."
                  type="text"
                />
              </div>

              <Divider />

              {post.comments.map((comment) => (
                <Card className="mx-3 space-y-2 p-3 my-5 text-xs border border-gray-300 rounded-md">
                  <div className="flex justify-between space-x-5">
                    <div className="flex items-center space-x-5">
                      <Avatar
                        sx={{ height: "2rem", width: "2rem", fontSize: "8rem" }}
                      ></Avatar>

                      <p>{comment.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </section>
          </>
        )}
      </Card>
    </div>
  );
};

export default PostCard;
