import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.DATABASE) {
      throw new Error("DATABASE environment variable not set!");
    }

    const conn = await mongoose.connect(process.env.DATABASE);

    console.log("✅ Connected to DB:", conn.connection.name);
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.DATABASE);

//     console.log("✅ Connected to DB:", conn.connection.name);
//   } catch (err) {
//     console.error("❌ DB connection error:", err.message);
//     process.exit(1);
//   }
// };

// export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const DB = process.env.DATABASE.replace(
//       "<PASSWORD>",
//       process.env.DATABASE_PASSWORD,
//     );

//     const conn = await mongoose.connect(DB);

//     console.log("✅ Connected to DB:", conn.connection.name);
//   } catch (err) {
//     console.error("❌ DB connection error:", err.message);
//     process.exit(1);
//   }
// };

// export default connectDB;
