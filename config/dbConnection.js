const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://talentsphere26_db_user:HJpqsM83aWn2vEig@talentspheredb.emmhk1o.mongodb.net/?appName=talentsphereDB");
    console.log("Mongo Db Connection successfully");
  } catch (error) {
    console.log("error mongo db connection == >", error);
  }
};

module.exports = {
  dbConnection
};


