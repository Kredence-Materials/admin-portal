import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import GetAppIcon from "@material-ui/icons/GetApp";
import { withStyles } from "@material-ui/core/styles";

import AlertDialog from "../extra/AlertDialog";

import styles from "./SearchForm.module.css";

const useStyles = (theme) => ({
  fields: {
    width: "100%",
    margin: "20px 0",
  },
  upload: {
    width: "max-content",
    margin: "20px 0",
    fontSize: "15px",
    background: "#2581e3",
  },
});

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productNumber: 0,
      batchNumber: 0,
      productName: "",
      type: "COA",
      fileUrl: null,
      fileName: "Choose File",
      isCOA: true,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.isCOA) {
      if (!this.state.productNumber || !this.state.batchNumber) {
        alert("All Fields Are Required");
        return;
      }
    } else if (!this.state.productName) {
      alert("All Fields Are Required");
      return;
    }

    const form = new FormData();
    form.append("type", this.state.type);

    if (this.state.isCOA) {
      form.append("productNumber", this.state.productNumber);
      form.append("batchNumber", this.state.batchNumber);
    } else {
      form.append("productName", this.state.productName);
    }

    axios
      .post("https://apikredence.herokuapp.com/file/get-document", form)
      .then((res) => {
        if (res.status !== 200) throw new Error();
        this.setState({
          fileName: res.data.fileName,
          fileUrl: res.data.fileLink,
        });
      })
      .catch((err) => {
        const catchError = err.response.data;
        alert(catchError.Message);
      });
  };

  setType = (event) => {
    this.setState({ type: event.target.value });
    this.setState({ isCOA: event.target.value === "COA" });
  };

  resetFile = () => {
    this.setState({ fileName: "", fileUrl: "" });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={styles.mainContainer}>
        <h1 className={styles.heading}>Search File</h1>

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
            {this.state.isCOA ? (
              <>
                <TextField
                  id="standard-basic"
                  label="Product Number"
                  type="number"
                  className={classes.fields}
                  name="productNumber"
                  value={this.state.productNumber}
                  onChange={this.handleChange}
                />
                <TextField
                  id="standard-basic"
                  label="Batch Number"
                  type="number"
                  className={classes.fields}
                  name="batchNumber"
                  value={this.state.batchNumber}
                  onChange={this.handleChange}
                />
              </>
            ) : (
              <TextField
                id="standard-basic"
                label="Product Name"
                type="text"
                className={classes.fields}
                name="productName"
                value={this.state.productName}
                onChange={this.handleChange}
              />
            )}

            <Button
              variant="contained"
              color="primary"
              className={classes.upload}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>

        {this.state.fileUrl && (
          <div className={styles.files}>
            <h1
              style={{
                fontSize: "21px",
                color: "#555",
                fontFamily: "Roboto",
                margin: "0",
              }}
            >
              {this.state.fileName}
            </h1>
            <Button
              variant="contained"
              href={this.state.fileUrl}
              style={{
                height: "min-content",
                padding: "7px 13px",
                margin: "0 10px",
                background: "#2581e3",
              }}
            >
              <GetAppIcon style={{ color: "white" }} />
            </Button>
            <AlertDialog
              fileName={this.state.fileName}
              resetFile={this.resetFile}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(SearchForm);
