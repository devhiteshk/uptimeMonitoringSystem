import {
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdLogin, MdLogout, MdScatterPlot, MdSettings } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Login, checkLoggedIn } from "../redux/apis/userApis";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { LogoutUSER, USER } from "../redux/reducers/userReducer";
import { DashboardCustomizeTwoTone, HomeTwoTone } from "@mui/icons-material";

export interface props {
  children?: React.ReactNode;
}

function Layout({ children }: props) {
  const [loggedIn, setloggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkLoggedIn().then((res) => {
      if (res.status === 200) {
        setloggedIn(true);
      }
    });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "hsl(250, 24%, 9%)",
        width: "100vw",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          maxWidth: "xl",
          width: "100%",
          height: "100%",
          pt: 3,
          px: { md: 5, xs: 1 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <MdScatterPlot size={40} style={{ fill: "cyan" }} />
            </Box>
            <Typography
              fontWeight={"bold"}
              sx={{ letterSpacing: 2 }}
              variant="body1"
              color={"#fff"}
            >
              UMS
            </Typography>
          </Box>
          <Box>
            {loggedIn ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { md: 2, xs: 2 },
                }}
              >
                <Tooltip title="Home">
                  <HomeTwoTone
                    onClick={() => navigate("/")}
                    sx={{
                      color: "#fff",
                      cursor: "pointer",
                      ":hover": {
                        color: "cyan",
                        transition: "0.5s ease-in-out",
                      },
                    }}
                  />
                </Tooltip>

                <Tooltip title="Dashboard">
                  <DashboardCustomizeTwoTone
                    onClick={() => navigate("/dashboard")}
                    sx={{
                      color: "#fff",
                      cursor: "pointer",
                      ":hover": {
                        color: "cyan",
                        transition: "0.5s ease-in-out",
                      },
                    }}
                  />
                </Tooltip>
                <BasicPopover />
              </Box>
            ) : (
              <LoginDialog />
            )}
          </Box>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

export default Layout;

const BasicPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dispatch(LogoutUSER());
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <Avatar
            sx={{
              width: 25,
              height: 25,
              color: "#000",
              fontSize: 15,
              fontWeight: "bold",
              backgroundColor: "#cfd8dc",
            }}
          >
            HK
          </Avatar>
          <IoIosArrowDown size={18} style={{ fill: "#cfd8dc" }} />
        </Box>
      </Button>
      <Popover
        sx={{ mt: 1 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            backgroundColor: "hsl(250, 24%, 9%)",
            border: "1px solid hsl(246, 11%, 22%)",
            maxWidth: "xs",
            width: "220px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#211f2d",
              borderRadius: 1,
              m: 1,
              px: 2,
              py: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar sx={{ width: 35, height: 35 }}>HK</Avatar>
            <Typography variant="body2" color="#fff" sx={{ p: 1 }}>
              Hitesh kumar
            </Typography>
          </Box>
          <Box
            sx={{
              my: 2,
              mx: 1,
              gap: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                cursor: "pointer",
                px: 1,
                py: 1,
                borderRadius: 1,
                ":hover": { backgroundColor: "#211f2d" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <MdSettings size={20} fill={"#90caf9"} />
                <Typography variant="caption" color={"#90caf9"}>
                  Settings
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                px: 1,
                py: 1,
                borderRadius: 1,
                ":hover": { backgroundColor: "#211f2d" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 2,
                }}
                onClick={handleLogout}
              >
                <MdLogout size={20} fill={"#ef9a9a"} />
                <Typography variant="caption" color={"#ef5350"}>
                  Logout
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export function LoginDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    await Login(email, password).then((res) => {
      if (res.status === 200) {
        dispatch(USER({ data: res.data.data, token: res.data.token }));
        localStorage.setItem("token", res?.data?.token);
        navigate("/dashboard");
      }
    });
  };

  return (
    <React.Fragment>
      <Box onClick={handleClickOpen}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "Center",
            gap: 1,
            px: 1,
            py: 1,
            borderRadius: 2,
            cursor: "pointer",
            ":hover": { backgroundColor: "#211f2d" },
          }}
        >
          <Typography variant="body1" color={"#fff"}>
            Login
          </Typography>
          <MdLogin size={22} fill={"#fff"} />
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <Box
            sx={{
              py: 4,
              px: { xs: 1, md: 2 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: 12,
                    md: 16,
                  },
                }}
              >
                Sign In
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <InputLabel>
                <Typography mb={1} variant="caption" color="initial">
                  Email
                </Typography>
              </InputLabel>
              <TextField
                hiddenLabel
                value={email}
                autoComplete="off"
                type="email"
                typeof="email"
                fullWidth
                sx={{
                  width: { xs: "100%" },
                  height: { xs: 10 },
                  fontSize: "10px",
                }}
                inputProps={{
                  style: {
                    height: "18px",
                    fontSize: "14px",
                  },
                }}
                size="small"
                id="outlined-basic"
                placeholder="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box pt={1}>
              <InputLabel>
                <Typography variant="caption" color="initial">
                  Password
                </Typography>
              </InputLabel>
              <TextField
                hiddenLabel
                fullWidth
                value={password}
                autoComplete="off"
                size="small"
                id="outlined-basic"
                placeholder="Password"
                variant="outlined"
                required
                inputProps={{
                  style: {
                    height: "18px",
                    fontSize: "14px",
                  },
                }}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      style={{ cursor: "pointer" }}
                      position="end"
                    >
                      {showPassword ? (
                        <Visibility style={{ color: "grey" }} />
                      ) : (
                        <VisibilityOff style={{ color: "grey" }} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <Box pt={3}>
                <Button
                  fullWidth
                  size="small"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#424242",
                    ":hover": { backgroundColor: "#000" },
                    textTransform: "capitalize",
                  }}
                  variant="contained"
                >
                  Sign In
                </Button>
              </Box>
              <Box>
                <Divider
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                ></Divider>
              </Box>
              {/* <Box
                    justifyContent="center"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      fontFamily="roboto"
                      color="grey"
                      sx={{
                        cursor: "pointer",
                        fontSize: {
                          xs: 8,
                          md: 12,
                        },
                        ":hover": { fontWeight: "bold" },
                        marginTop: "10px",
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  </Box> */}
            </Box>
          </Box>
        </>
      </Dialog>
    </React.Fragment>
  );
}
