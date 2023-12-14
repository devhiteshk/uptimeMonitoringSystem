import { Box, Button, Grid, Typography } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Add } from "@mui/icons-material";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import { getAllProjects } from "../../redux/apis/userApis";

function Dashboard() {
  const [Projects, setProjects] = useState<
    [
      {
        name: string;
        _id: string;
        services: [""];
        userId: string;
      }
    ]
  >([{ name: "", _id: "", services: [""], userId: "" }]);

  useEffect(() => {
    getAllProjects()
      .then((res) => setProjects(res?.data?.user?.projects))
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
            Create Project
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
        {Projects
          ? Projects.map((project) => (
              <Grid item xs={12} sm={6} md={3}>
                <ProjectCard
                  id={project._id}
                  name={project?.name}
                  services={project.services}
                />
              </Grid>
            ))
          : ""}
      </Grid>
    </div>
  );
}

export default Dashboard;
