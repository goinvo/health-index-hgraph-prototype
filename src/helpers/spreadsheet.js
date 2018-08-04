import config from "../config";

export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A2:T"
      })
      .then(
        response => {
          const data = response.result.values;
          const metrics = data.map(metric => ({
            id: metric[0],
            label: metric[0],
            absoluteMin: parseInt(metric[1], 10),
            absoluteMax: parseInt(metric[2], 10),
            healthyMin: parseInt(metric[3], 10),
            healthyMax: parseInt(metric[4], 10),
            value: parseInt(metric[5], 10),
            unitLabel: "",
            weight: parseInt(metric[6], 10)
          })) || [];
          callback({
            metrics
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}
