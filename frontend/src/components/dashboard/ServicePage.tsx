import { ArrowBack } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getServiceById } from "../../redux/apis/userApis";
import { Link } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { Stats } from "./charts/MainStats";
import { DeleteDialog } from "./ProjectPage";

function ServicePage() {
  const [serviceData, setServiceData] = useState<{
    currentStatus: number;
    downCount: number;
    upCount: number;
    serviceName: string;
    url: string;
    _id: string;
    projectId: {
      name: string;
      _id: string;
    };
    monitorLogs: [
      {
        _id: string;
        hitTime: string;
        responseTime: number;
        status: number;
      }
    ];
  }>({
    currentStatus: 0,
    downCount: 0,
    upCount: 0,
    serviceName: "",
    url: "",
    _id: "",
    projectId: {
      name: "",
      _id: "",
    },
    monitorLogs: [
      {
        _id: "",
        hitTime: "",
        responseTime: 0,
        status: 0,
      },
    ],
  });

  console.log(serviceData?.upCount, serviceData.downCount);

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];

    getServiceById(id)
      .then((res) => setServiceData(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  return (
    <Box>
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
      {serviceData?.currentStatus === 0 ? (
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
      ) : (
        <Box mt={4}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "fit-content",
                gap: 1,
                flexDirection: "column",
              }}
            >
              <Typography variant="body1" color="#fff">
                {serviceData?.serviceName}
              </Typography>
              <Typography variant="body2" color="#f06292">
                <span style={{ color: "#fff" }}>URL {`-> `}</span>
                <Link
                  style={{ textDecoration: "none", color: "#f06292" }}
                  to={serviceData?.url}
                  target="_blank"
                >
                  {serviceData?.url}
                </Link>
              </Typography>
            </Box>
            <DeleteDialog
              type={"DELSER"}
              projectId={serviceData?.projectId?._id}
              serviceId={serviceData?._id}
              projectName={""}
              serviceName={serviceData?.serviceName}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              mt: 1,
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 5 }}
            >
              <Typography variant="body2" color={"#fff"}>
                Logs : {serviceData?.monitorLogs?.length}
              </Typography>
              <Box>
                {serviceData?.currentStatus >= 200 &&
                serviceData?.currentStatus < 300 ? (
                  <Typography variant="body2" color={"rgb(81, 255, 0)"}>
                    {serviceData?.currentStatus} OK
                  </Typography>
                ) : serviceData?.currentStatus >= 300 &&
                  serviceData?.currentStatus < 400 ? (
                  <Typography variant="body2" color={"#ff9800"}>
                    {serviceData?.currentStatus} Redirected
                  </Typography>
                ) : (
                  <Typography variant="body2" color={"#dd2c00"}>
                    {serviceData?.currentStatus} Error
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Typography variant="body2" color={"#fff"}>
                  Uptime
                </Typography>
                <Typography variant="body2" color={"#b2ff59"}>
                  {(
                    (100 * serviceData?.upCount) /
                    (serviceData?.upCount + serviceData?.downCount)
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
                    (100 * serviceData?.downCount) /
                    (serviceData?.upCount + serviceData?.downCount)
                  )
                    .toString()
                    .slice(0, 5)}
                  %
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Stats
        upCount={serviceData?.upCount}
        downCount={serviceData?.downCount}
        Logs={serviceData.monitorLogs}
      />
    </Box>
  );
}

export default ServicePage;
