import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  // console.log(image);
  if(!image) return null
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://linkup-api-pojo.onrender.com/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
