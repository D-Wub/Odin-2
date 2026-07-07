const pool = require("./pool");

exports.getMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  rows.map(row => {
    const date = new Date(row.creation_date);
    row.creation_date = date.toLocaleString();
  })
  return rows;
}

exports.createPost = async (username, content) => {
  await pool.query("INSERT INTO messages (username, content) VALUES ($1, $2)", [username, content]);
}

//Delete Entries if needed
//TRUNCATE TABLE messages;