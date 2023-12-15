import * as React from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { createProject } from "../../redux/apis/userApis";
import { ToastContainer, toast } from "react-toastify";

interface CreateProjectInterface {
  update: number;
  setUpdate: (name: number) => void;
}

export function CreateProjectDialog(props: CreateProjectInterface) {
  const [projectName, setProjectName] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateProject = () => {
    createProject(projectName)
      .then((res) => {
        if (res.status === 200) {
          props?.setUpdate(props?.update + 1);
          handleClose();
          setProjectName("");
          toast.success("Project Created Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch(() =>
        toast.error("Try again later!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      );
  };

  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Button
        onClick={handleClickOpen}
        sx={{
          color: "#f06292",
          ":hover": { backgroundColor: "hsl(270, 40%, 16%)" },
        }}
        startIcon={<Add />}
      >
        Create Project
      </Button>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "hsl(250, 24%, 18%)",
          },
        }}
        maxWidth={"xs"}
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ color: "#f06292" }}>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 2 }}
            color="secondary"
            inputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{
              style: {
                color: "#f06292",
              },
            }}
            value={projectName}
            autoFocus
            margin="dense"
            id="name"
            label="Name of Project"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#f06292",
              ":hover": { backgroundColor: "hsl(270, 40%, 16%)" },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: "#f06292",
              ":hover": { backgroundColor: "hsl(270, 40%, 16%)" },
            }}
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
