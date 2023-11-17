import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { _id, friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends.find((friend) => friend._id === friendId);
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/auth/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispath(setFriends({ friends: data }));
  };
  // console.log(userPicturePath);
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box>
          <Typography
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0); //to refresh tha page and get information
            }}
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              color: palette.primary.light2,
              cursor: "pointer",
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
          {/* TODO: ADD POST TIME */}
        </Box>
      </FlexBetween>
      {_id !== friendId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ background: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
