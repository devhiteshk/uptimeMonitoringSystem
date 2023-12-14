import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLoggedIn } from "../redux/apis/userApis";
import { Box } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthContext = createContext<boolean>(false);

const AuthProvider = ({ children }: AuthContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const checkAuth = async () => {
    const res = await checkLoggedIn();
    if (res.status === 200) {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    // Validate token with the server and set isAuthenticated accordingly
    checkAuth();
  }, []);

  return (
    <>
      {!loading ? (
        <AuthContext.Provider value={isAuthenticated}>
          {children}
        </AuthContext.Provider>
      ) : (
        <>
          <Box
            sx={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "hsl(250, 24%, 9%)",
            }}
          >
            <ThreeCircles
              height="50"
              width="50"
              color="cyan"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </Box>
        </>
      )}
    </>
  );
};

export { AuthContext, AuthProvider };
