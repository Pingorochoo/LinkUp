import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import UserImage from "./UserImage";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CommentTarget = ({
  userId,
  comment,
  name,
  handleLikeComment,
  isLiked,
}) => {
  const { palette } = useTheme();
  const paddingLeft = "0.8rem";
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={isNonMobileScreens ? "calc(100% - 44px)" : undefined}
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: palette.neutral.light,
          padding: `.4rem ${paddingLeft}`,
          borderRadius: "1.2rem",
          wordWrap: "break-word",
        }}
      >
        <Typography
          onClick={() => navigate(`/profile/${userId}`)}
          sx={{
            color: palette.neutral.main,
            m: "0",
            pl: "0",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            color: palette.neutral.main,
            m: "0",
            pl: "0",
            fontSize: "1rem",
          }}
        >
          {comment}
        </Typography>
      </Box>
      <Box marginLeft=".3rem">
        <Button
          onClick={() => handleLikeComment()}
          sx={{
            padding: "0px",
            textTransform: "none",
            color: isLiked ? palette.primary.main : palette.neutral.mediumMain,
            fontWeight: "bold",
            display: "inline-block",
            minWidth: 0,
            marginInline: ".5rem",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
              textDecorationColor: palette.neutral.mediumMain,
            },
          }}
        >
          Like
        </Button>
        <Button
          sx={{
            padding: "0px",
            textTransform: "none",
            color: palette.neutral.mediumMain,
            fontWeight: "bold",
            display: "inline-block",
            minWidth: 0,
            marginInline: ".5rem",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
              textDecorationColor: palette.neutral.mediumMain,
            },
          }}
        >
          Comment
        </Button>
      </Box>
    </Box>
  );
};

const Comment = ({
  userId,
  loggedInUserId,
  commentId,
  userPicturePath,
  name,
  children,
  likes,
}) => {
  const likeInitial = likes.includes(loggedInUserId) ? true : false;
  const [isLiked, setIsLiked] = useState(likeInitial);
  // const handleIsLike = () =>
  //   likes.includes(userId) ? setIsLiked(true) : setIsLiked(false);
  const handleLikeComment = async () => {
    if (isLiked) setIsLiked(false);
    else setIsLiked(true);
    const response = await fetch(
      `http://localhost:3001/post/comment/like/${commentId}/${loggedInUserId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.isLiked && isLiked) setIsLiked(false);
    else if (!json.isLiked && !isLiked) setIsLiked(true);
    // const likes = await response.json();
    // handleIsLike(likes);
    // handleIsLike(likes.length);
  };
  return (
    <Box display="flex" justifyContent="flex-start" gap=".5rem">
      <UserImage image={userPicturePath} size="36px" />
      <CommentTarget
        userId={userId}
        comment={children}
        name={name}
        handleLikeComment={handleLikeComment}
        isLiked={isLiked}
      />
    </Box>
  );
};

export default Comment;
