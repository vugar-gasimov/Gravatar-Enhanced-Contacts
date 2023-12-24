const app = require("./app");
const mongoose = require("mongoose");

const { DB_ADMIN, PORT = 3000 } = process.env;

mongoose
  .connect(DB_ADMIN)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database was connected successfully");
      console.log(`Server is running. Use our Api on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
