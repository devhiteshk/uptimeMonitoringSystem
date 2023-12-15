import { Box, Typography } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";

interface Log {
  _id: string;
  hitTime: string;
  responseTime: number;
  status: number;
}

interface StatsProps {
  Logs: Log[];
  upCount: number;
  downCount: number;
}

export const Stats: React.FC<StatsProps> = ({ Logs, upCount, downCount }) => {
  const responseData: number[] = [];
  const responselabels: string[] = [];
  let total: number = 0;

  const upData: number[] = [];
  const downData: number[] = [];
  const redirectedData: number[] = [];

  Logs
    ? Logs?.map(
        (e: {
          _id: string;
          hitTime: string;
          responseTime: number;
          status: number;
        }) => {
          responseData.push(e.responseTime);
          total = total + Number(e.responseTime);
          responselabels.push(new Date(e.hitTime).toUTCString());

          if (e.status >= 200 && e.status < 300) {
            upData.push(e.responseTime);
          } else {
            upData.push(0);
          }

          if (e.status >= 300 && e.status < 400) {
            redirectedData.push(e.responseTime);
          } else {
            redirectedData.push(0);
          }

          if (
            (e.status >= 400 && e.status < 600) ||
            (e.status >= 0 && e.status < 200)
          ) {
            downData.push(e.responseTime);
          } else {
            downData.push(0);
          }
        }
      )
    : "";

  const avgResponseTime = (total / Logs?.length).toFixed(3);

  return (
    <>
      {Logs?.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Box>
            <Typography variant="body1" color="#f06292">
              Stats
            </Typography>
          </Box>
          <Box>
            <Box sx={{ width: "100%" }}>
              <LineChart
                lineData={responseData}
                labels={responselabels}
                title={"Response Time / Req."}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="#fff">
                Average Response Time :{" "}
                <span style={{ color: "greenYellow" }}>
                  {avgResponseTime} ms{" "}
                </span>
              </Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
              <BarChart
                lineData={upData}
                labels={responselabels}
                title={"Up Time"}
                type={"UP"}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="#fff">
                Up Time :{" "}
                <span style={{ color: "greenYellow" }}>
                  {upCount * 10} mins{" "}
                </span>
              </Typography>
            </Box>

            <Box sx={{ width: "100%" }}>
              <BarChart
                lineData={downData}
                labels={responselabels}
                title={"Down Time"}
                type={"DOWN"}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="#fff">
                Down Time :{" "}
                <span style={{ color: "#e53935" }}>{downCount * 10} mins </span>
              </Typography>
            </Box>

            <Box sx={{ width: "100%" }}>
              <BarChart
                lineData={redirectedData}
                labels={responselabels}
                title={"Redirected"}
                type={""}
              />
            </Box>
          </Box>
        </Box>
      ) : (
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
            height="30"
            width="30"
            color="cyan"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Box>
      )}
    </>
  );
};
