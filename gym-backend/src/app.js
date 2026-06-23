import express from "express";
import cors from "cors";
import "./cron/subscription.cron.js";
import memberRoutes from "./routes/member.routes.js";
import packageRoutes from "./routes/package.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";

// 🔐 Security imports
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "mongo-sanitize";
//import xss from "xss-clean";
import xss from "xss";
import hpp from "hpp";
import morgan from "morgan";

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://your-project.vercel.app",], // your frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));


// 🛡️ 1. Helmet (secure headers)
app.use(helmet());


// 🚫 2. Rate Limiting (global)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: "Too many requests, try again later",
});
app.use(limiter);


// 💉 3. Prevent NoSQL Injection
app.use((req, res, next) => {
   if (req.body) req.body = mongoSanitize(req.body);
  if (req.params) req.params = mongoSanitize(req.params);

  next();
});


app.use((req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  if (req.params) {
    for (let key in req.params) {
      if (typeof req.params[key] === "string") {
        req.params[key] = xss(req.params[key]);
      }
    }
  }

  next();
});


// 🚫 5. Prevent HTTP Parameter Pollution
app.use(hpp());




app.use("/api/members", memberRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;