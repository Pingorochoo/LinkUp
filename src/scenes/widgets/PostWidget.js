import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Comment from "components/Comment";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import InsertComment from "components/InsertComment";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { _id: loggedInUserId, picturePath: loggedInUserPicturePath } =
    useSelector((state) => state.user);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/post/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const post = await response.json();
    dispatch(setPost({ post }));
  };
  const getAndSetComments = async () => {
    const res = await fetch(
      `http://localhost:3001/post/comment/getCommentBypost/${postId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const postComments = await res.json();
    setComments(postComments);
    setCommentsCount(postComments.length);
    return postComments;
  };
  const toogleComments = async () => {
    if (isComments) return setIsComments(false);
    setIsComments(true);
  };
  useEffect(() => {
    getAndSetComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween>
            <IconButton
              onClick={patchLike}
              sx={{ paddingInline: "0rem .2rem" }}
            >
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography fontSize="18px">{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween>
            <FlexBetween gap="0.3rem">
              <IconButton onClick={toogleComments}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography fontSize="18px">{commentsCount}</Typography>
            </FlexBetween>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box display="flex" flexDirection="column" gap=".2rem">
          {comments.map(({ _id, comment, user, likes, picturePath }, i) => {
            return (
              <Box key={`${name}-${i}`}>
                <Comment
                  userId={user.userId}
                  loggedInUserId={loggedInUserId}
                  commentId={_id}
                  userPicturePath={user.picturePath}
                  name={user.name}
                  location={user.location}
                  likes={likes}
                  picturePath={picturePath}
                >
                  {comment}
                </Comment>
              </Box>
            );
          })}
        </Box>
      )}
      <InsertComment
        userId={loggedInUserId}
        userPicturePath={loggedInUserPicturePath}
        postId={postId}
        getAndSetComments={getAndSetComments}
        setCommentsCount={setCommentsCount}
      />
    </WidgetWrapper>
  );
};

export default PostWidget;
