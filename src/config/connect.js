import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectLocalDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/new")
    .then(() => console.log("Kết nối thành công"))
    .catch((err) => console.log(err));

  const DBConnection = mongoose.connection;

  DBConnection.on("error", (err) => console.log(`Kết nối thất bại ${err}`));
  DBConnection.once("open", () => console.log("Kết nối db thành công"));
};

export const connectOnlDB = () => {
  const mongoAtlasUri = process.env.MONGO_ATLAT_URI;

  try {
    // Connect to the MongoDB cluster
    mongoose
      .connect(mongoAtlasUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Mongoose đã được kết nối");
      })
      .catch((error) => {
        console.log("Kết nối thất bại:", error);
      });
  } catch (e) {
    console.log("Không thể kết nối");
  }

  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Kết nối thất bại ${err}`));
  dbConnection.once("open", () => console.log("Kết nối thành công đến DB!"));
};