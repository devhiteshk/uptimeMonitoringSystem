import { Box, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import { getAllProjects } from "../../redux/apis/userApis";
import { useNavigate } from "react-router-dom";
import { CreateProjectDialog } from "../services/CreateProject";

function Dashboard() {
  const [update, setUpdate] = useState<number>(0);
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
            Your Projects
          </Typography>
        </Box>
        <Box>
          <CreateProjectDialog update={update} setUpdate={setUpdate} />
        </Box>
      </Box>

      <Grid
        sx={{ mt: 2 }}
        container
        columns={12}
        columnSpacing={3}
        rowSpacing={3}
      >
        {Projects
          ? Projects.map((project) => (
              <Grid key={project?._id} item xs={12} sm={6} md={3}>
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
