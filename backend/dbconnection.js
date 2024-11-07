const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async () => {
  try {
    let uri = "mongodb+srv://<username>:<password>@cluster0.5skyy0a.mongodb.net/<dbname>?appName=Cluster0";
    let dbURL = uri
      .replace("<username>", process.env.DB_USERNAME)
      .replace("<password>", process.env.DB_PASSWORD)
      .replace("<dbname>", process.env.DB_NAME);

    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("----------------- DB Connected -------------------");
  } catch (err) {
    console.error("DB Connection failed\n", err);
    process.exit(1);
  }
};

module.exports = connectDB;

