import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { Toaster } from "react-hot-toast";
import { Add } from "@mui/icons-material";

function Dashboard() {
  const selector = useAppSelector((state) => state.user);
  console.log(selector);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 10,
          p: 2,
          border: "1px solid hsl(270, 55%, 43%)",
          borderRadius: 2,
        }}
      >
        <Box>
          <Typography variant="body1" color={"#fff"}>
            {" "}
            Your Projects
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{
              color: "#f06292",
              ":hover": { backgroundColor: "hsl(270, 40%, 16%)" },
            }}
            startIcon={<Add />}
          >
            {" "}
            Create Project
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
