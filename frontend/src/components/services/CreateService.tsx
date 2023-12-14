import * as React from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { createProject } from "../../redux/apis/userApis";

function isUrlValid(string: string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

interface CreateProjectInterface {
  update: number;
  setUpdate: (name: number) => void;
}

export function CreateServiceDialog(props: CreateProjectInterface) {
  const [serviceName, setServiceName] = React.useState<string>("");
  const [URL, setURL] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateService = () => {
    if (isUrlValid(URL)) {
      createProject(serviceName).then((res) => {
        if (res.status === 200) {
          props?.setUpdate(props?.update + 1);
          handleClose();
          setServiceName("");
          setURL("");
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{
          color: "#f06292",
          ":hover": { backgroundColor: "hsl(270, 40%, 16%)" },
        }}
        startIcon={<Add />}
      >
        Create Service
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
        <DialogTitle sx={{ color: "#f06292" }}>Create New Service</DialogTitle>
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
            value={serviceName}
            autoFocus
            margin="dense"
            id="name"
            label="Name of Service"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setServiceName(e.target.value)}
          />
          <TextField
            sx={{ marginTop: 2 }}
            color="secondary"
            inputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{
              style: {
                color: "#f06292",
              },
            }}
            value={URL}
            margin="dense"
            id="name"
            label="URL to Monitor"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setURL(e.target.value)}
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
            onClick={handleCreateService}
          >
            Create Service
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
