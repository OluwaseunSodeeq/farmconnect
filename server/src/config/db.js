import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD,
    );

    const conn = await mongoose.connect(DB);

    console.log("✅ Connected to DB:", conn.connection.name);
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
// const connectDB = async () => {
//   try {
//     const DB = process.env.DATABASE.replace(
//       "<PASSWORD>",
//       process.env.DATABASE_PASSWORD,
//     );

//     mongoose
//       .connect(DB)
//       .then(() => console.log("Connected to DB:", mongoose.connection.name));
//   } catch (err) {
//     console.error("DB connection error:", err);
//     process.exit(1);
//   }
// };

// export default connectDB;
