import { Box, Button, Grid, Typography } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getAllServices } from "../../redux/apis/userApis";
import ServiceCard from "./ServiceCard";

function ProjectPage() {
  const [ProjectName, setProjectName] = useState<string>("");
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
  }, []);

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
            {ProjectName}
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
            Create Service
          </Button>
        </Box>
      </Box>

      <Grid
        sx={{ mt: 5 }}
        container
        columns={12}
        columnSpacing={3}
        rowSpacing={3}
      >
        {AllServices
          ? AllServices.map((service) => (
              <Grid item xs={12} sm={6} md={4}>
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
