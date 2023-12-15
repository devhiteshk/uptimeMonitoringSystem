import { Box, Grid, Typography, Tooltip } from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  deleteProject,
  deleteService,
  getAllServices,
} from "../../redux/apis/userApis";
import ServiceCard from "./ServiceCard";
import { useNavigate } from "react-router-dom";
import { CreateServiceDialog } from "../services/CreateService";

function ProjectPage() {
  const [ProjectName, setProjectName] = useState<string>("");
  const [update, setUpdate] = useState<number>(0);
  const [projectId, setProjectId] = useState<string>("");

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
    setProjectId(id);
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DeleteDialog
            projectId={projectId}
            serviceId={""}
            projectName={ProjectName}
            type={"DELPRO"}
            serviceName={""}
          />
          <CreateServiceDialog
            projectId={projectId}
            update={update}
            setUpdate={setUpdate}
          />
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
                  projectId={projectId}
                />
              </Grid>
            ))
          : ""}
      </Grid>
    </div>
  );
}

export default ProjectPage;

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function DeleteDialog(props: {
  projectId: string;
  serviceId: string;
  type: string;
  projectName: string;
  serviceName: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (props?.type === "DELPRO") {
      deleteProject(props?.projectId).then(() => {
        console.log("deleted");
        handleClose();
      });
    } else {
      deleteService(props?.serviceId, props?.projectId).then(() => {
        console.log("deleted");
        handleClose();
      });
    }
  };

  return (
    <React.Fragment>
      <Tooltip
        title={props?.type === "DELPRO" ? "Delete Project" : "Delete Service"}
      >
        <Delete
          sx={{
            color: "#f06292",
            ":hover": { color: "#f44336" },
            cursor: "pointer",
          }}
          onClick={handleClickOpen}
        />
      </Tooltip>

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "hsl(250, 24%, 18%)",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ color: "#f06292" }} id="alert-dialog-title">
          {props?.type === "DELPRO"
            ? `Delete Project ${props?.projectName} `
            : `Delete Service ${props?.serviceName}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: "#fff" }}
            id="alert-dialog-description"
          >
            {props?.type === "DELPRO"
              ? "Are you sure you want to delete this project and its services?, this action cannot be reverted."
              : "Are you sure you want to delete this service and its contents?, this action cannot be reverted."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#f06292",
              ":hover": { backgroundColor: "hsl(270, 40%, 16%)" },
            }}
            onClick={handleClose}
          >
            Disagree
          </Button>
          <Button
            sx={{
              color: "#f06292",
              ":hover": { backgroundColor: "hsl(270, 40%, 16%)" },
            }}
            onClick={handleDelete}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
