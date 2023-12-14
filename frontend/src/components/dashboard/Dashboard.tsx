import { Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { Toaster } from "react-hot-toast";

function Dashboard() {
  const selector = useAppSelector((state) => state.user);
  console.log(selector);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Typography variant="caption" color="#fff">
        Dash
      </Typography>
    </div>
  );
}

export default Dashboard;
