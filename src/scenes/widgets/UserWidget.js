import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  // const token = useSelector((state) => state.token) || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDliMjRjMWZkMjEzZDgzOGM3OGU4MjEiLCJmaXJzdE5hbWUiOiJtYW51ZWwiLCJsYXN0TmFtZSI6Im1hbnVlbCIsImVtYWlsIjoibWFudWVsQG1hbnVlbC5tYW51ZWwiLCJwaWN0dXJlUGF0aCI6IlNjcmVlblNob3QtMjAyMy02LTIzXzE4LTMtNDUucG5nIiwiZnJpZW5kcyI6W10sImxvY2F0aW9uIjoibWFudWVsIiwib2NjdXBhdGlvbiI6Im1hbnVlbCIsInZpZXdlZFByb2ZpbGUiOjMwMjcsImltcHJlc3Npb25zIjozMjc1LCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI3VDE4OjA0OjQ5LjY4OFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI3VDE4OjA0OjQ5LjY4OFoiLCJfX3YiOjAsImlhdCI6MTY4Nzk4MjU0Mn0.bCXs7QcD__jCCuQYLUDIZFVLQGVOdwQxBHgJOTLstSA"
  const dark = palette?.neutral?.dark;
  const medium = palette?.neutral?.medium;
  const main = palette?.nautral?.main;
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/auth/${userId}`, {
      //switch auth with user
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        // flexDirection='column'
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                color: palette.primary.light,
                cursos: "pointer",
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length}</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      {/* second row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* third row */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      {/* fourth row */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontFamily="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
