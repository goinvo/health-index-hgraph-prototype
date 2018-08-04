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
            name: metric[0],
            min: metric[1],
            max: metric[2],
            healthyMin: metric[3],
            healthyMax: metric[4],
            value: metric[5]
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
