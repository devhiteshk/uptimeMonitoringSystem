import { Box, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getAllServices } from "../../redux/apis/userApis";
import ServiceCard from "./ServiceCard";
import { useNavigate } from "react-router-dom";
import { CreateServiceDialog } from "../services/CreateService";

function ProjectPage() {
  const [ProjectName, setProjectName] = useState<string>("");
  const [update, setUpdate] = useState<number>(0);
  const [AllServices, setAllServices] = useState<
    [
      {
        _id: string;
        serviceName: string;
        url: string;
        upCount: number;
        downCount: number;
        monitorLogs: [""];
        currentStatus: number;
      }
    ]
  >([
    {
      _id: "",
      serviceName: "",
      url: "",
      upCount: 0,
      downCount: 0,
      monitorLogs: [""],
      currentStatus: 0,
    },
  ]);

  useEffect(() => {
    const id = location.pathname.split("/")[2];

    getAllServices(id)
      .then((res) => {
        setAllServices(res?.data?.project?.services);
        setProjectName(res?.data?.project?.name);
      })
      .catch((err) => console.log(err));
  }, [update]);

  const navigate = useNavigate();

  return (
    <div>
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
          <Typography variant="body1" color={"#fff"}>
            {ProjectName}
          </Typography>
        </Box>
        <Box>
          <CreateServiceDialog update={update} setUpdate={setUpdate} />
        </Box>
      </Box>

      <Grid
        sx={{ mt: 2 }}
        container
        columns={12}
        columnSpacing={3}
        rowSpacing={3}
      >
        {AllServices
          ? AllServices.map((service) => (
              <Grid key={service?._id} item xs={12} sm={6} md={4}>
                <ServiceCard
                  serviceName={service?.serviceName}
                  url={service?.url}
                  currentStatus={service?.currentStatus}
                  upCount={service?.upCount}
                  downCount={service?.downCount}
                  id={service?._id}
                  monitorLogs={service?.monitorLogs}
                />
              </Grid>
            ))
          : ""}
      </Grid>
    </div>
  );
}

export default ProjectPage;
