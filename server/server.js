// Connect to DB safely, then start server
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

dotenv.config({ path: "./config.env" });

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.use(
      cors({
        origin: "https://farmconnect-admin.vercel.app",
        credentials: true,
      }),
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config({ path: "./config.env" }); // LOAD FIRST

// import app from "./src/app.js";
// import connectDB from "./src/config/db.js";

// // Connect to Database
// await connectDB();

// const PORT = process.env.PORT || 3000;

// app.use(
//   cors({
//     // origin: "http://localhost:3001",
//     origin: "https://farmconnect-admin.vercel.app",
//     credentials: true,
//   }),
// );
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import dotenv from "dotenv";
// import app from "./src/app.js";
// import connectDB from "./src/config/db.js";
// dotenv.config({ path: "./config.env" });

// // Connect to Database
// await connectDB();

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
