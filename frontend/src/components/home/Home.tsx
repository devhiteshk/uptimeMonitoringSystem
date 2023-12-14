import { Box, Typography } from "@mui/material";
import uptimeSVG from "./../../assets/uptime.svg";
function Home() {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          flexDirection: { md: "row", xs: "column" },
          maxWidth: "lg",
          width: "100%",
          mt: 5,
        }}
      >
        <Box
          mt={1}
          sx={{
            textAlign: { xs: "center", md: "left" },
            pl: { md: 8, xs: 0 },
          }}
          width={"100%"}
        >
          <Typography
            sx={{ fontSize: { md: 70, sm: 50, xs: 30 } }}
            fontWeight={"bold"}
            color="#fff"
          >
            <span>Uptime</span> <br />
            <span style={{ color: "yellow" }}>Monitoring</span>
            <br />
          </Typography>
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              width: "100%",
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Box
              sx={{
                width: "fit-content",
                position: "relative",
              }}
            >
              <Typography
                sx={{ fontSize: { md: 70, sm: 50, xs: 30 } }}
                fontWeight={"bold"}
                color="#fff"
              >
                System
              </Typography>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  position: "absolute",
                  right: { md: -40, sm: -20, xs: -20 },
                  top: { md: 48, sm: 28.5, xs: 9.2 },
                }}
                className="circles"
              >
                <span className="circle1"></span>
                <span className="circle2"></span>
                <span className="circle3"></span>
              </Box>
            </Box>
          </Box>
          {/* <Box mt={4}>
            <Button
              sx={{
                backgroundColor: "hsl(250, 24%, 9%)",
                border: "1px solid #fff",
                fontWeight: "bold",
                color: "#fff",
                width: "180px",

                ":hover": { backgroundColor: "#fff", color: "#000" },
              }}
              variant="contained"
            >
              View DashBoard
            </Button>
          </Box> */}
        </Box>

        <Box
          sx={{
            width: "fit-content",
            p: { md: 8, xs: 4 },
            maxWidth: { xs: "300px", sm: "350px", md: "450px" },
            borderRadius: "50%",
            zIndex: 1,
          }}
        >
          <img
            draggable={false}
            src={uptimeSVG}
            width={"100%"}
            alt="uptime monitoring System"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
