import { Box, Button, Grid, Typography } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getAllServices } from "../../redux/apis/userApis";

function ProjectPage() {
  const [AllServices, setAllServices] = useState([]);
  const [ProjectName, setProjectName] = useState("");

  useEffect(() => {
    const id = location.pathname.split("/")[2];

    getAllServices(id)
      .then((res) => {
        setAllServices(res?.data?.project?.services);
        setProjectName(res?.data?.project?.name);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(AllServices);

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
        <Grid item xs={12} sm={6} md={3}>
          <Box
            // onClick={() => navigate(`/project/${props?.id}`)}
            sx={{
              backgroundColor: "hsl(246, 11%, 22%)",
              p: 4,
              cursor: "pointer",
              borderRadius: 2,
              ":hover": { backgroundColor: "hsl(246, 11%, 28%)" },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="body2"
                fontWeight={"bold"}
                letterSpacing={1}
                color={"#fff"}
              >
                Name
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color={"#f06292"}>
                  Services
                </Typography>
                <Typography variant="body2" color={"#f06292"}>
                  status
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProjectPage;
