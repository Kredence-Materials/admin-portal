import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAgree = () => {
    const form = new FormData();
    form.append("fileName", this.props.fileName);

    axios
      .post("https://apikredence.herokuapp.com/file/delete-file", form)
      .then((res) => {
        if (res.status !== 200) throw new Error();
        this.props.resetFile();
        alert(res.data.Message);
      })
      .catch((err) => {
        if (err.response) {
          const catchError = err.response.data;
          alert(catchError.Message);
        }
      });
    this.handleClose();
  };
  handleDisagree = () => {
    this.handleClose();
  };
  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
          style={{
            height: "min-content",
            padding: "7px 13px",
            marginLeft: "10px",
          }}
        >
          <DeleteIcon style={{ color: "white" }} />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete File</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this file
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAgree} color="primary">
              Ok
            </Button>
            <Button onClick={this.handleDisagree} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
