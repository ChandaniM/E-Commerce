let connection = require("../config/dbConnection");
let query = require("../config/query");

const getanalyticsDetails = () => {
  return new Promise((resolve, reject) => {
    connection.query(query.QUERY_COUNT_TABLE, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          type: "success",
          message: "All Table Count done successfully!",
          response: results,
        });
      }
    });
  });
};
