const pool = require("../config/database");

const _login = async (email) => {
  const DB = await pool.connect();
  console.log(email);
  const QUERY = {
    text: "SELECT * FROM customer WHERE email = $1",
    values: [`${email}`],
  };
  const result = await DB.query(QUERY);
  return result;
};

module.exports = { _login };
