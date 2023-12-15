import { Box, Typography } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

interface ProjectInterface {
  name: string;
  services: [""];
  id: string;
}

function ProjectCard(props: ProjectInterface) {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/project/${props?.id}`)}
      sx={{
        backgroundColor: "hsl(246, 11%, 22%)",
        p: 4,
        cursor: "pointer",
        borderRadius: 2,
        ":hover": { backgroundColor: "hsl(246, 11%, 28%)" },
      }}
    >
      {props.id.length < 10 ? (
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
          <Typography
            variant="body2"
            fontWeight={"bold"}
            letterSpacing={1}
            color={"#fff"}
          >
            {props?.name}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color={"#f06292"}>
              Services
            </Typography>
            <Typography variant="body2" color={"#f06292"}>
              {props?.services?.length}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProjectCard;
