import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { withStyles } from "@material-ui/core/styles";

import styles from "./UploadForm.module.css";

const useStyles = (theme) => ({
  fields: {
    width: "100%",
    margin: "20px 0",
  },
  upload: {
    width: "max-content",
    margin: "20px 0",
    fontSize: "15px",
  },
});

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officialName: "",
      productName: "",
      batchNumber: "",
      type: "COA",
      file: null,
      fileName: "Choose File",
      isCOA: true,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      !this.state.officialName ||
      !this.state.productName ||
      !this.state.file
    ) {
      alert("All Fields Are Required");
      return;
    }

    if (this.state.isCOA && !this.state.batchNumber) {
      alert("All Fields Are Required");
      return;
    }

    const form = new FormData();
    form.append("type", this.state.type);
    form.append("file", this.state.file);
    form.append("officialName", this.state.officialName);
    form.append("productName", this.state.productName);

    if (this.state.isCOA) form.append("batchNumber", this.state.batchNumber);

    axios
      .post("https://apikredence.herokuapp.com/file/upload", form)
      .then((res) => {
        if (res.status !== 200) throw new Error();
        alert(res.data.Message);
        this.setState({
          officialName: "",
          batchNumber: "",
          productName: "",
          type: "COA",
          file: null,
          fileName: "Choose File",
        });
      })
      .catch((err) => {
        if (err.response) {
          const catchError = err.response.data;
          alert(catchError.Message);
          this.setState({
            officialName: "",
            batchNumber: 0,
            productName: "",
            type: "COA",
            file: null,
            fileName: "Choose File",
          });
        }
      });
  };

  setType = (event) => {
    this.setState({ type: event.target.value });
    this.setState({ isCOA: event.target.value === "COA" });
  };

  setFile = (event) => {
    const fileName = event.target.files[0].name;
    var fileExt = fileName.split(".").pop();

    if (fileExt !== "pdf") {
      alert("File Type not supported");
      return;
    }

    this.setState({
      file: event.target.files[0],
      fileName,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={styles.mainContainer}>
        <h1 className={styles.heading}>Admin Portal</h1>

        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.right} onChange={this.setType}>
            <h5>Type : </h5>
            <div className={styles.check}>
              <input
                type="radio"
                value="COA"
                name="option"
                checked={this.state.isCOA}
              />
              <label>COA</label>
            </div>

            <div className={styles.check}>
              <input type="radio" value="MSDS" name="option" />
              <label>MSDS</label>
            </div>

            <div className={styles.check}>
              <input type="radio" value="TREM" name="option" />
              <label>TREM Card</label>
            </div>
          </div>

          <div className={styles.left}>
            <TextField
              id="standard-basic"
              label="Name Of The Official"
              className={classes.fields}
              name="officialName"
              value={this.state.officialName}
              onChange={this.handleChange}
            />

            <TextField
              id="standard-basic"
              label="Product Name"
              type="text"
              className={classes.fields}
              name="productName"
              value={this.state.productName}
              onChange={this.handleChange}
            />

            {this.state.isCOA && (
              <TextField
                id="standard-basic"
                label="Batch Number"
                type="text"
                className={classes.fields}
                name="batchNumber"
                value={this.state.batchNumber}
                onChange={this.handleChange}
              />
            )}
            <div className={styles.fileUpload} onChange={this.setFile}>
              <p style={{ margin: "0" }}> {this.state.fileName} </p>
              <label
                className="btn btn-primary"
                style={{ width: "max-content", margin: "40px 10px" }}
              >
                Browse&hellip;
                <input type="file" style={{ display: "none" }} />
              </label>
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.upload}
              type="submit"
            >
              <ArrowUpwardIcon style={{ fontSize: "20px" }} />
              Upload
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles)(UploadForm);
