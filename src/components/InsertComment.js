import { Box, InputBase, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useState } from "react";
const InsertComment = ({ userPicturePath }) => {
  const { palette } = useTheme();
  const [comment, setComment] = useState("");
  const handleComment = () => {
    console.log("ga");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleComment();
  };
  return (
    <Box mt=".5rem" display="flex" gap=".4rem">
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
