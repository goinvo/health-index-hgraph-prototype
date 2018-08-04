import React, { Component } from 'react';

import config from "../config";
import { load } from "../helpers/spreadsheet";

class HgraphWrapper extends Component {
  constructor() {
    super();

    this.state = {
      metrics: [],
      error: null
    };
  }

  componentDidMount() {
    // 1. Load the JavaScript client library.
    window.gapi.load("client", this.initClient);
  }

  initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: config.apiKey,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: config.discoveryDocs
      })
      .then(() => {
      // 3. Initialize and make the API request.
      load(this.onLoad);
    });
  }

  onLoad = (data, error) => {
    if (data) {
      const metrics = data.metrics;
      this.setState({ metrics });
    } else {
      this.setState({ error });
    }
  }

  render() {
    const { metrics, error } = this.state;
    if (error) {
      return <div>{this.state.error.message}</div>;
    }
    return (
      <ul>
        {metrics.map((metric, i) => (
          <li key={metric.name}>
            {metric.name}
            {metric.min}
            {metric.max}
            {metric.healthyMin}
            {metric.healthyMax}
            {metric.value}
          </li>
        ))}
      </ul>
    );
  }
}

export default HgraphWrapper;
