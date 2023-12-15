import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { deleteProject, deleteService } from "../../redux/apis/userApis";

export default function DeleteDialog(props: {
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
