import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// DEBUGGING: Wrap express.Router to catch route registration errors
const originalRouter = express.Router;
express.Router = function(...args) {
  const router = originalRouter.apply(this, args);
  const methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'];
  
  methods.forEach(method => {
    const originalMethod = router[method];
    if (originalMethod) {
      router[method] = function(path, ...handlers) {
        console.log(`🔍 Attempting to register ${method.toUpperCase()} route: "${path}"`);
        try {
          const result = originalMethod.call(this, path, ...handlers);
          console.log(`✅ Successfully registered ${method.toUpperCase()} route: "${path}"`);
          return result;
        } catch (error) {
          console.error(`❌ ERROR registering ${method.toUpperCase()} route: "${path}"`);
          console.error(`Error details:`, error.message);
          throw error;
        }
      };
    }
  });
  
  return router;
};

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

console.log("🚀 Starting server initialization...");

// Import socket first
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

console.log("📦 Setting up middleware...");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

console.log("🛣️  Loading routes...");

// Import and use routes with error handling
try {
  console.log("📂 Importing auth routes...");
  const authRoutes = await import("./routes/auth.route.js");
  app.use("/api/auth", authRoutes.default);
  console.log("✅ Auth routes loaded successfully");
} catch (error) {
  console.error("❌ Error loading auth routes:", error.message);
  process.exit(1);
}

try {
  console.log("📂 Importing message routes...");
  const messageRoutes = await import("./routes/message.route.js");
  app.use("/api/messages", messageRoutes.default);
  console.log("✅ Message routes loaded successfully");
} catch (error) {
  console.error("❌ Error loading message routes:", error.message);
  process.exit(1);
}

if (process.env.NODE_ENV === "production") {
  console.log("🏭 Setting up production static files...");
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

console.log("🎧 Starting server...");
server.listen(PORT, () => {
  console.log("✅ Server is running on PORT:" + PORT);
  connectDB();
});