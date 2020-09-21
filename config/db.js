const mongoose = require("mongoose");
const config = require("config");

const db = config.get("MONGO_URI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('DB connected')
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
