import express from "express";
import 'dotenv/config';
import cors from "cors"

import aiRoutes from "./routes/ai.routes.js";

const app = express(); // creates server does not start it.

app.use(express.json());

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }))

// ✅ Use cors middleware for all routes
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Explicitly handle all preflight requests before other routes
app.options(/.*/, (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  }
  return res.status(200).end();
});

app.use("/api/v1/ai",aiRoutes);

app.get("/fine",(req,res)=>{
    res.send({
        pass: "test pass"
    })
})
// app.use("api/v1/user/",aiRoutes);

export default app;