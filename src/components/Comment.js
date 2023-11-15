import { Box, Button, Typography } from "@mui/material";
import UserImage from "./UserImage";
import { useTheme } from "@emotion/react";
const CommentTarget = ({ comment, name }) => {
  const { palette } = useTheme();
  const paddingLeft = "0.8rem";
  const InteractionButton = ({ children }) => (
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
      {children}
    </Button>
  );
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: palette.neutral.light,
          padding: `.4rem ${paddingLeft}`,
          borderRadius: "1.2rem",
        }}
      >
        <Typography
          sx={{
            color: palette.neutral.main,
            m: "0",
            pl: "0",
            fontSize: "13px",
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
        <InteractionButton>Like</InteractionButton>
        <InteractionButton>Comment</InteractionButton>
      </Box>
    </Box>
  );
};

const Comment = ({ userPicturePath, name, children }) => {
  return (
    <Box display="flex" justifyContent="flex-start" gap=".5rem">
      <UserImage image={userPicturePath} size="36px" />
      <CommentTarget comment={children} name={name} />
    </Box>
  );
};

export default Comment;
