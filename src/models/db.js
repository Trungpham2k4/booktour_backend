const mysql = require("mysql2/promise");

// Tạo pool để tái sử dụng kết nối
const pool = mysql.createPool({
  host: "localhost",
  user: "root", // đổi theo DB của bạn
  password: "123456", // đổi theo DB của bạn
  database: "booktour", // tên DB
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
