import React, { Component } from "react";
import ReactDOM from "react-dom";
import Papa from "papaparse";
import test from "./test.csv";
import ReactTable from "react-table";
import "./styles.css";
import "react-table/react-table.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      body: [],
      meta: {},
      error: {}
    };
  }
  parseCSVtoJSON() {
    const parsed = Papa.parse(test);
    this.setState({
      headers: parsed.data[0],
      body: parsed.data.slice(1),
      meta: parsed.meta,
      error: parsed.errors
    });
  }
  buildColumns = data => {
    if (!data) {
      return [
        {
          Header: "",
          accessor: ""
        }
      ];
    }
    const columns = data.map(key => {
      return { Header: key, accessor: key };
    });

    return columns;
  };
  buildData = body => {
    if (!body) {
      return [];
    }
    let rows = body.map(row => {
      let obj = {};
      this.state.headers.forEach((header, index) => (obj[header] = row[index]));
      return obj;
    });

    return rows;
  };
  componentDidMount() {
    this.parseCSVtoJSON();
  }

  render() {
    return (
      <React.Fragment>
        <ReactTable
          data={this.buildData(this.state.body)}
          columns={this.buildColumns(this.state.headers)}
        />
        error: {JSON.stringify(this.state.error)}
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
