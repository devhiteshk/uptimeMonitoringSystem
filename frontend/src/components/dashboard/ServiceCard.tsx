import { Box, Typography } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

interface ServiceInterface {
  currentStatus: number;
  serviceName: string;
  url: string;
  monitorLogs: [""];
  upCount: number;
  downCount: number;
  id: string;
  projectId: string;
}

function ServiceCard(props: ServiceInterface) {
  const navigate = useNavigate();
  return (
    <div>
      <Box
        onClick={() => navigate(`/service/${props?.id}`)}
        sx={{
          backgroundColor: "hsl(246, 11%, 22%)",
          p: 4,
          cursor: "pointer",
          borderRadius: 2,
          ":hover": { backgroundColor: "hsl(246, 11%, 28%)" },
        }}
      >
        {props?.currentStatus === 0 ? (
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography
                variant="body2"
                fontWeight={"bold"}
                letterSpacing={1}
                color={"#fff"}
              >
                {props?.serviceName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ wordWrap: "break-word" }}
                color={"cyan"}
              >
                ULR: {props?.url}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color={"#fff"}>
                Logs : {props?.monitorLogs?.length}
              </Typography>
              <Box>
                {props?.currentStatus >= 200 && props?.currentStatus < 300 ? (
                  <Typography variant="body2" color={"rgb(81, 255, 0)"}>
                    {props?.currentStatus} OK
                  </Typography>
                ) : props?.currentStatus >= 300 &&
                  props?.currentStatus < 400 ? (
                  <Typography variant="body2" color={"#ff9800"}>
                    {props?.currentStatus} Redirected
                  </Typography>
                ) : (
                  <Typography variant="body2" color={"#dd2c00"}>
                    {props?.currentStatus} Error
                  </Typography>
                )}
              </Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color={"#fff"}>
                  Uptime
                </Typography>
                <Typography variant="body2" color={"#b2ff59"}>
                  {(
                    (100 * props?.upCount) /
                    (props?.upCount + props?.downCount)
                  )
                    .toString()
                    .slice(0, 5)}
                  %
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color={"#fff"}>
                  Downtime
                </Typography>
                <Typography variant="body2" color={"#e64a19"}>
                  {(
                    (100 * props?.downCount) /
                    (props?.upCount + props?.downCount)
                  )
                    .toString()
                    .slice(0, 5)}
                  %
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default ServiceCard;
