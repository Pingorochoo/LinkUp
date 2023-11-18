import { Box, InputBase, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useState } from "react";
const InsertComment = ({
  userId,
  userPicturePath,
  postId,
  getAndSetComments,
  setCommentsCount,
}) => {
  const { palette } = useTheme();
  const [comment, setComment] = useState("");
  const handleComment = async () => {
    if (comment.trim() === "") return;
    setComment("");
    const res = await fetch(`https://linkup-api-pojo.onrender.com/post/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Establece el encabezado para indicar que estás enviando JSON en el cuerpo.
      },
      body: JSON.stringify({
        userId,
        comment,
      }),
    });
    const comments = await res.json();
    if (comments.length > 0) getAndSetComments(comments);
    setCommentsCount(comments.length);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") return handleComment();
  };
  return (
    <Box mt="1rem" display="flex" gap=".4rem">
      <UserImage image={userPicturePath} size="36px" />
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        borderRadius="1rem"
        sx={{
          padding: ".2rem .8rem",
          backgroundColor: palette.neutral.light,
        }}
      >
        <InputBase
          placeholder="write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            width: "100%",
          }}
        />
        {comment !== "" && (
          <SendRoundedIcon cursor="pointer" onClick={handleComment} />
        )}
      </Box>
    </Box>
  );
};

export default InsertComment;
