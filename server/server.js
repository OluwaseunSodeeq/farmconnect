import dotenv from "dotenv";
import app from "./src/app.js";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, { tls: true })
  .then(() => console.log("DB connection successful!"));

// Create and save a new user

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
