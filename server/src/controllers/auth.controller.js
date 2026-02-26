import User from "../models/User.js";
import createSendToken from "../utils/token.js";
import { loginSchema } from "../validators/auth.validation.js";

export const register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details.map((d) => d.message),
      });
    }

    const { email, password } = value;
    const emailNormalized = email.toLowerCase();

    const user = await User.findOne({ email: emailNormalized }).select(
      "+password",
    );

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        status: "fail",
        message: "Account not active",
      });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// export const login = async (req, res) => {
//   try {
//     // ✅ 1. Validate Input Using Joi
//     const { error } = loginSchema.validate(req.body);

//     if (error) {
//       return res.status(400).json({
//         status: "fail",
//         message: error.details[0].message,
//       });
//     }

//     const { email, password } = req.body;

//     // ✅ 2. Find User
//     const user = await User.findOne({ email }).select("+password");

//     if (!user || !(await user.correctPassword(password, user.password))) {
//       return res.status(401).json({
//         status: "fail",
//         message: "Incorrect email or password",
//       });
//     }

//     // ✅ 3. Check Account Status
//     if (user.status !== "active") {
//       return res.status(403).json({
//         status: "fail",
//         message: "Account not active",
//       });
//     }

//     // ✅ 4. Send Token
//     createSendToken(user, 200, res);
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Please provide email and password",
//       });
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user || !(await user.correctPassword(password, user.password))) {
//       return res.status(401).json({
//         status: "fail",
//         message: "Incorrect email or password",
//       });
//     }

//     if (user.status !== "active") {
//       return res.status(403).json({
//         status: "fail",
//         message: "Account not active",
//       });
//     }

//     createSendToken(user, 200, res);
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     // 1️⃣ Validate Input
//     const { error } = loginSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({
//         status: "fail",
//         message: error.details[0].message,
//       });
//     }

//     const { email, password } = req.body;

//     // 2️⃣ Find User
//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return res.status(401).json({
//         status: "fail",
//         message: "Invalid email or password",
//       });
//     }

//     // 3️⃣ Compare Password
//     const isCorrect = await user.correctPassword(password, user.password);

//     if (!isCorrect) {
//       return res.status(401).json({
//         status: "fail",
//         message: "Invalid email or password",
//       });
//     }

//     // 4️⃣ Check Account Status
//     if (user.status !== "active") {
//       return res.status(403).json({
//         status: "fail",
//         message: "Account not active",
//       });
//     }

//     // 5️⃣ Generate Token
//     const token = signToken(user._id);

//     res.status(200).json({
//       status: "success",
//       token,
//       data: {
//         user: {
//           id: user._id,
//           name: user.name,
//           role: user.role,
//           email: user.email,
//         },
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };
