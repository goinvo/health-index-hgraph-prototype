import React, { Component } from 'react';

import config from "../config";
import { load } from "../helpers/spreadsheet";

import HGraph, { calculateHealthScore } from 'hgraph-react';

class HgraphWrapper extends Component {
  constructor() {
    super();

    this.state = {
      metrics: [],
      score: 0,
      error: null
    };
  }

  componentDidMount() {
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.initClient);
  }

  initClient = () => {
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
        load(this.onLoad);
      });
  }

  onLoad = (data, error) => {
    if (data) {
      const metrics = data.metrics;
      this.setState({
        metrics,
        score: parseInt(calculateHealthScore(metrics), 10)
      });
    } else {
      this.setState({ error });
    }
  }

  refresh = () => {
    load(this.onLoad);
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    }
    return (
      <div>
        <HGraph
          data={ this.state.metrics }
          score={ this.state.score }
          width={ 600 }
          height={ 600 }
          fontSize={ 16 }
          pointRadius={ 10 }
          scoreFontSize={ 120 } />
        <button className="btn" onClick={ this.refresh }>Refresh data</button>
      </div>
    );
  }
}

export default HgraphWrapper;
