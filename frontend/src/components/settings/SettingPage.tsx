import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getUser } from "../../redux/apis/userApis";
import { ThreeCircles } from "react-loader-spinner";

function Settings() {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    imgUrl: string;
  }>({
    firstName: "",
    lastName: "",
    imgUrl: "",
  });
  useEffect(() => {
    getUser().then((res) => setUser(res?.data?.user));
  }, []);
  console.log(user);

  const navigate = useNavigate();
  return (
    <>
      {user?.firstName === "" ? (
        <Box
          width={"100%"}
          height={"100%"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeCircles
            height="20"
            width="20"
            color="cyan"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Box>
      ) : (
        <div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Box
            onClick={() => navigate(-1)}
            mt={4}
            sx={{
              cursor: "pointer",
              backgroundColor: "hsl(270, 55%, 23%)",
              width: "fit-content",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              p: 0.5,
            }}
          >
            <ArrowBack sx={{ fontSize: 25, color: "#fff" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
              p: 2,
              border: "1px solid hsl(270, 55%, 43%)",
              borderRadius: 2,
            }}
          >
            <Box>
              <Typography variant="body1" color={"#f06292"}>
                Your Profile
              </Typography>
              <Box mt={3}>
                <Avatar
                  src={user?.imgUrl}
                  sx={{ width: 80, height: 80 }}
                ></Avatar>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Typography variant="body2" color="#fff">
                  Name
                </Typography>
                <Typography variant="body2" color="#f06292">
                  {user?.firstName + " " + user?.lastName}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
}

export default Settings;
